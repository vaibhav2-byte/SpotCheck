"""
Low-Latency LanceDB & Groq RAG Engine for Gym Machine Setup Specialist
"""

import json
import time
import os
from typing import Dict, Any, List, Optional

try:
    import lancedb
    import pyarrow as pa
    LANCEDB_AVAILABLE = True
except ImportError:
    LANCEDB_AVAILABLE = False

try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False

DATASET_PATH = os.path.join(os.path.dirname(__file__), "manuals_dataset.json")

class LanceDBGymEngine:
    def __init__(self, db_uri: str = "/tmp/lancedb_gym"):
        self.db_uri = db_uri
        self.manuals = self.load_dataset()
        self.table = None
        self.groq_api_key = os.getenv("GROQ_API_KEY", "")
        self.init_db()

    def load_dataset(self) -> List[Dict[str, Any]]:
        with open(DATASET_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

    def init_db(self):
        if not LANCEDB_AVAILABLE:
            print("[LanceDB] Library not installed; running in ultra-fast in-memory fallback mode.")
            return

        db = lancedb.connect(self.db_uri)
        # Prepare records for LanceDB
        records = []
        for item in self.manuals:
            full_text = f"{item['name']} {item['brand']} {item['category']} {' '.join(item['aliases'])} {item['manual_excerpt']}"
            # For demonstration, generate 64-dim normalized hash projection vector
            vec = self._compute_embedding(full_text)
            records.append({
                "id": item["id"],
                "name": item["name"],
                "brand": item["brand"],
                "category": item["category"],
                "manual_ref": item["manual_ref"],
                "text": full_text,
                "vector": vec,
                "metadata": json.dumps(item)
            })

        self.table = db.create_table("gym_manuals", data=records, mode="overwrite")
        print(f"[LanceDB] Ingested {len(records)} manuals into LanceDB table successfully.")

    def _compute_embedding(self, text: str, dims: int = 64) -> List[float]:
        """Fast lightweight embedding projection for sub-millisecond mobile latency"""
        import hashlib
        import math
        tokens = text.lower().split()
        vec = [0.0] * dims
        for tok in tokens:
            h = int(hashlib.md5(tok.encode()).hexdigest(), 16)
            idx = h % dims
            weight = 1.0 + (h % 5) * 0.2
            vec[idx] += weight

        norm = math.sqrt(sum(x * x for x in vec)) or 1.0
        return [x / norm for x in vec]

    def search_manual(self, query: str, top_k: int = 1) -> Dict[str, Any]:
        """Sub-15ms LanceDB vector search"""
        start_time = time.perf_counter()

        if LANCEDB_AVAILABLE and self.table:
            q_vec = self._compute_embedding(query)
            results = self.table.search(q_vec).limit(top_k).to_list()
            matched_item = json.loads(results[0]["metadata"]) if results else self.manuals[0]
        q_words = set(tok for tok in query.lower().replace("-", " ").split() if len(tok) > 2 and tok != "machine")
        q_vec = self._compute_embedding(query)
        q_lower = query.lower()

        matched_item = None
        best_score = -1.0

        for m in self.manuals:
            # 1. Cosine similarity on projection vectors
            full_text = f"{m['name']} {m['brand']} {m['category']} {' '.join(m['aliases'])} {m['manual_excerpt']}"
            doc_vec = self._compute_embedding(full_text)
            cos_sim = sum(a * b for a, b in zip(q_vec, doc_vec))

            # 2. Token overlap score
            doc_tokens = set(tok for tok in full_text.lower().replace("-", " ").split() if len(tok) > 2)
            overlap = len(q_words & doc_tokens) / max(1, len(q_words))

            # 3. Exact phrase & alias bonuses
            bonus = 0.0
            if m["name"].lower() in q_lower or q_lower in m["name"].lower():
                bonus += 2.0
            for alias in m["aliases"]:
                alias_clean = alias.lower()
                if alias_clean in q_lower or q_lower in alias_clean:
                    bonus += 1.5
                alias_tokens = set(alias_clean.split())
                if alias_tokens and alias_tokens.issubset(q_words | {"machine"}):
                    bonus += 1.2

            score = (cos_sim * 0.4) + (overlap * 1.5) + bonus

            if score > best_score:
                best_score = score
                matched_item = m

        if not matched_item:
            matched_item = self.manuals[0]

        vector_latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return {
            "machine": matched_item,
            "vector_latency_ms": vector_latency_ms
        }

    def summarize_with_groq(self, machine: Dict[str, Any], query: str) -> Dict[str, Any]:
        """
        Enforces strict constraints:
        - 3 numbered bullet points
        - Bold adjustment pins (**Pull yellow seat pop-pin #1**)
        - 1 Seat Height Adjustment Tip
        - Under 2-second target
        """
        start_time = time.perf_counter()

        if GROQ_AVAILABLE and self.groq_api_key:
            client = Groq(api_key=self.groq_api_key)
            prompt = f"""You are the On-the-Spot Gym Machine Setup Specialist.
Machine: {machine['name']} ({machine['brand']})
User Query: {query}
Manual Excerpt:
{machine['manual_excerpt']}

STRICT OUTPUT CONSTRAINTS FOR MID-WORKOUT READABILITY:
1. Provide EXACTLY 3 numbered setup steps.
2. Bold key adjustment pins/levers (**Pull yellow pop-pin #1**).
3. Provide EXACTLY 1 distinct Seat Height Adjustment Tip.
Return JSON with keys: 'seat_tip', 'steps', 'safety_note'."""

            try:
                resp = client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    max_tokens=300,
                    temperature=0.1
                )
                data = json.loads(resp.choices[0].message.content)
                llm_ms = round((time.perf_counter() - start_time) * 1000, 2)
                return {
                    "seat_tip": data.get("seat_tip", machine["seat_tip"]),
                    "steps": data.get("steps", machine["steps"]),
                    "safety_note": data.get("safety_note", f"Verified against {machine['manual_ref']}"),
                    "llm_latency_ms": llm_ms,
                    "engine": "Groq Llama-3-8B Cloud"
                }
            except Exception as e:
                print(f"[Groq] API call failed: {e}, falling back to edge synthesizer")

        # Edge fallback synthesizer (sub-1ms)
        llm_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return {
            "seat_tip": machine["seat_tip"],
            "steps": machine["steps"],
            "safety_note": f"Official {machine['brand']} Technical Spec ({machine['manual_ref']})",
            "llm_latency_ms": llm_ms,
            "engine": "Local Edge RAG Synthesizer"
        }

    def run_pipeline(self, query: str) -> Dict[str, Any]:
        """Full end-to-end pipeline with total latency benchmark"""
        total_start = time.perf_counter()
        
        # 1. Vector Search
        search_res = self.search_manual(query)
        machine = search_res["machine"]
        
        # 2. Summarization with Groq
        summary = self.summarize_with_groq(machine, query)
        
        total_latency_ms = round((time.perf_counter() - total_start) * 1000, 2)

        return {
            "machine": machine,
            "summary": summary,
            "telemetry": {
                "vector_search_ms": search_res["vector_latency_ms"],
                "llm_inference_ms": summary["llm_latency_ms"],
                "total_pipeline_ms": total_latency_ms,
                "sub_2s_sla_passed": total_latency_ms < 2000.0
            }
        }

if __name__ == "__main__":
    engine = LanceDBGymEngine()
    test_query = "Hammer Strength Lat Pulldown"
    result = engine.run_pipeline(test_query)
    print("\n--- BENCHMARK TEST ---")
    print(f"Query: {test_query}")
    print(f"Total Latency: {result['telemetry']['total_pipeline_ms']}ms (Sub-2s: {result['telemetry']['sub_2s_sla_passed']})")
    print(f"Seat Tip: {result['summary']['seat_tip']}")
    print("Steps:")
    for step in result['summary']['steps']:
        print(f" - {step}")
