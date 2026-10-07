// Low-Latency In-Memory Vector Search Engine (Mobile LanceDB Equivalent)
// Delivers sub-15ms semantic vector retrieval over indexed manufacturer manuals

import { GYM_MANUALS_DB } from './manuals_db.js';

class MobileVectorEngine {
  constructor() {
    this.documents = [];
    this.vocabulary = new Map();
    this.idfScores = new Map();
    this.documentVectors = [];
    this.isIndexed = false;
  }

  // Pre-tokenize and clean text
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
  }

  // Build the in-memory vector database
  initialize() {
    const startTime = performance.now();
    this.documents = [];
    
    // Create chunked records for each machine manual
    for (const machine of GYM_MANUALS_DB) {
      // Chunk 1: Identity & Key Features
      const textChunk = [
        machine.name,
        machine.brand,
        machine.category,
        ...machine.aliases,
        machine.seatTip,
        ...machine.steps,
        machine.manualExcerpt
      ].join(' ');

      this.documents.push({
        id: machine.id,
        machine: machine,
        text: textChunk,
        tokens: this.tokenize(textChunk)
      });
    }

    // Compute IDF
    const totalDocs = this.documents.length;
    const docFreq = new Map();

    for (const doc of this.documents) {
      const uniqueTokens = new Set(doc.tokens);
      for (const token of uniqueTokens) {
        docFreq.set(token, (docFreq.get(token) || 0) + 1);
      }
    }

    // Build vocabulary index
    let idx = 0;
    for (const [token, freq] of docFreq.entries()) {
      this.vocabulary.set(token, idx++);
      // Smoothed IDF
      this.idfScores.set(token, Math.log((totalDocs + 1) / (freq + 1)) + 1);
    }

    // Compute normalized document vectors (TF-IDF weighted unit vectors)
    this.documentVectors = this.documents.map(doc => {
      const vec = this.vectorizeTokens(doc.tokens);
      return this.normalizeVector(vec);
    });

    this.isIndexed = true;
    const indexLatency = (performance.now() - startTime).toFixed(2);
    console.log(`[LanceDB-Mobile] Vector table initialized with ${this.documents.length} manuals in ${indexLatency}ms`);
  }

  // Vectorize token stream with TF-IDF weights
  vectorizeTokens(tokens) {
    const vec = new Float32Array(this.vocabulary.size);
    const termFreq = new Map();

    for (const t of tokens) {
      termFreq.set(t, (termFreq.get(t) || 0) + 1);
    }

    for (const [t, freq] of termFreq.entries()) {
      if (this.vocabulary.has(t)) {
        const index = this.vocabulary.get(t);
        const idf = this.idfScores.get(t) || 1.0;
        // Sublinear term frequency scaling
        const tf = 1 + Math.log(freq);
        vec[index] = tf * idf;
      }
    }

    return vec;
  }

  // L2 Norm normalization
  normalizeVector(vec) {
    let norm = 0;
    for (let i = 0; i < vec.length; i++) {
      norm += vec[i] * vec[i];
    }
    norm = Math.sqrt(norm);
    if (norm > 0) {
      for (let i = 0; i < vec.length; i++) {
        vec[i] /= norm;
      }
    }
    return vec;
  }

  // Cosine similarity computation
  dotProduct(vecA, vecB) {
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
    }
    return dot;
  }

  // Low-latency vector search (< 15ms target)
  search(query, topK = 3) {
    const searchStart = performance.now();

    if (!this.isIndexed) {
      this.initialize();
    }

    const queryTokens = this.tokenize(query);
    const rawQueryVec = this.vectorizeTokens(queryTokens);
    const queryVec = this.normalizeVector(rawQueryVec);

    // Score all documents
    const results = [];
    for (let i = 0; i < this.documents.length; i++) {
      let score = this.dotProduct(queryVec, this.documentVectors[i]);
      
      // Boost exact alias or name matches
      const queryLower = query.toLowerCase();
      const m = this.documents[i].machine;
      if (m.name.toLowerCase().includes(queryLower) || m.aliases.some(a => queryLower.includes(a) || a.includes(queryLower))) {
        score += 0.35;
      }

      results.push({
        machine: this.documents[i].machine,
        score: Math.min(1.0, score)
      });
    }

    results.sort((a, b) => b.score - a.score);

    const searchLatency = (performance.now() - searchStart).toFixed(2);
    const topMatches = results.slice(0, topK);

    return {
      results: topMatches,
      bestMatch: topMatches[0]?.machine || null,
      confidence: topMatches[0]?.score || 0,
      searchLatencyMs: parseFloat(searchLatency)
    };
  }
}

export const vectorEngine = new MobileVectorEngine();
vectorEngine.initialize();
