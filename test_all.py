"""
Automated Test Suite for SpotCheck RAG (Low-Latency Mobile RAG Machine Setup Specialist)
Covers:
1. Dataset Integrity & Schema Compliance
2. Vector Retrieval Accuracy & Ranking
3. Strict Output Constraints (3 bullets, bold pins, seat tip)
4. Sub-2s SLA Latency Benchmarking
5. Live HTTP Web Server Endpoints & Static Assets
"""

import os
import sys
import json
import time
import urllib.request
import unittest

# Add project root to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, "python_backend"))

from rag_engine import LanceDBGymEngine

class TestSpotCheckRAG(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = LanceDBGymEngine()
        cls.dataset_path = os.path.join(BASE_DIR, "python_backend", "manuals_dataset.json")
        with open(cls.dataset_path, "r", encoding="utf-8") as f:
            cls.dataset = json.load(f)

    # =========================================================================
    # 1. Dataset Integrity Tests
    # =========================================================================
    def test_01_dataset_not_empty(self):
        """Dataset must contain indexed gym machines."""
        self.assertGreater(len(self.dataset), 0)
        print(f"  [PASS] Found {len(self.dataset)} machines in database.")

    def test_02_dataset_schema_validation(self):
        """All machines must strictly adhere to the required schema."""
        required_fields = [
            "id", "name", "brand", "category", "manual_ref", "aliases",
            "seat_tip", "steps", "primary_muscles", "secondary_muscles",
            "key_pins", "manual_excerpt"
        ]
        expected_brands = {"Hammer Strength", "Life Fitness", "TechnoGym", "Rogue"}
        found_brands = set()

        for item in self.dataset:
            for field in required_fields:
                self.assertIn(field, item, f"Missing field '{field}' in {item.get('id')}")
            found_brands.add(item["brand"])
            
            # Check strict constraints
            self.assertLessEqual(len(item["steps"]), 3, f"Steps exceed 3 in {item['id']}")
            self.assertGreater(len(item["steps"]), 0, f"Steps empty in {item['id']}")
            self.assertTrue(any("**" in step for step in item["steps"]), f"No bold pins in steps for {item['id']}")
            self.assertTrue("**" in item["seat_tip"], f"Seat tip must contain bold pin reference in {item['id']}")

        self.assertTrue(expected_brands.issubset(found_brands), f"Missing brands: {expected_brands - found_brands}")
        print(f"  [PASS] All {len(self.dataset)} records passed strict schema validation across brands: {found_brands}")

    # =========================================================================
    # 2. Vector Retrieval & Accuracy Tests
    # =========================================================================
    def test_03_vector_retrieval_exact_queries(self):
        """Exact machine queries must map to their respective manual IDs."""
        test_cases = [
            ("Hammer Strength Iso-Lateral Front Lat Pulldown", "hammer-strength-iso-lat-pulldown"),
            ("Life Fitness Signature Series Seated Leg Curl", "life-fitness-seated-leg-curl"),
            ("Life Fitness Signature Series Chest Press", "life-fitness-chest-press"),
            ("TechnoGym Pure Strength Hack Squat", "technogym-pure-hack-squat"),
            ("Rogue Monster Seated Cable Low Row", "rogue-seated-cable-row"),
        ]

        for query, expected_id in test_cases:
            res = self.engine.search_manual(query)
            matched_id = res["machine"]["id"]
            self.assertEqual(matched_id, expected_id, f"Query '{query}' expected {expected_id}, got {matched_id}")
            print(f"  [PASS] Retrieved '{query}' -> '{matched_id}' in {res['vector_latency_ms']}ms")

    def test_04_vector_retrieval_fuzzy_and_alias_queries(self):
        """Fuzzy casual search queries must reliably map to the correct machine."""
        fuzzy_cases = [
            ("lat pulldown", "hammer-strength-iso-lat-pulldown"),
            ("seated leg curl machine", "life-fitness-seated-leg-curl"),
            ("chest press machine", "life-fitness-chest-press"),
            ("hack squat", "technogym-pure-hack-squat"),
            ("cable low row", "rogue-seated-cable-row"),
        ]

        for query, expected_id in fuzzy_cases:
            res = self.engine.search_manual(query)
            matched_id = res["machine"]["id"]
            self.assertEqual(matched_id, expected_id, f"Fuzzy query '{query}' expected {expected_id}, got {matched_id}")
            print(f"  [PASS] Fuzzy matched '{query}' -> '{matched_id}' in {res['vector_latency_ms']}ms")

    # =========================================================================
    # 3. Dynamic Summarization & Strict Constraints
    # =========================================================================
    def test_05_strict_output_constraints(self):
        """Dynamic summary must satisfy 3-bullet max, bold pins, and seat tip."""
        query = "Pin-selected Seated Leg Curl"
        result = self.engine.run_pipeline(query)
        summary = result["summary"]

        # Exactly 3 steps
        self.assertLessEqual(len(summary["steps"]), 3)
        self.assertGreaterEqual(len(summary["steps"]), 1)

        # Bold adjustment pins
        for step in summary["steps"]:
            self.assertIn("**", step, f"Step missing bold pin marker: {step}")

        # Seat height tip present
        self.assertTrue(len(summary["seat_tip"]) > 10)
        self.assertIn("**", summary["seat_tip"])
        print("  [PASS] Strict 3-bullet and bold pin constraints confirmed.")

    # =========================================================================
    # 4. Latency SLA (< 2000ms SLA Benchmark)
    # =========================================================================
    def test_06_sub_2s_latency_sla(self):
        """Total pipeline response time must be strictly under 2.0 seconds (2000ms)."""
        benchmark_queries = [
            "Hammer Strength Lat Pulldown",
            "Pin-selected Seated Leg Curl",
            "Life Fitness Chest Press",
            "TechnoGym Hack Squat",
            "Rogue Monster Row"
        ]

        latencies = []
        for q in benchmark_queries:
            result = self.engine.run_pipeline(q)
            total_ms = result["telemetry"]["total_pipeline_ms"]
            latencies.append(total_ms)
            self.assertLess(total_ms, 2000.0, f"Latency SLA violated: {total_ms}ms >= 2000ms for '{q}'")
            self.assertTrue(result["telemetry"]["sub_2s_sla_passed"])

        avg_latency = sum(latencies) / len(latencies)
        print(f"  [PASS] Sub-2s SLA passed for all queries. Avg pipeline latency: {avg_latency:.2f}ms (Max: {max(latencies):.2f}ms)")

    # =========================================================================
    # 5. Live Web Server & Static Endpoints Verification
    # =========================================================================
    def test_07_live_web_server_endpoints(self):
        """Verify the local web server serves index.html and all assets with HTTP 200."""
        urls = [
            ("http://localhost:8080/", "text/html"),
            ("http://localhost:8080/css/style.css", "text/css"),
            ("http://localhost:8080/js/app.js", "application/javascript"),
            ("http://localhost:8080/js/vector_engine.js", "application/javascript"),
            ("http://localhost:8080/js/manuals_db.js", "application/javascript"),
            ("http://localhost:8080/js/muscle_diagram.js", "application/javascript"),
            ("http://localhost:8080/js/groq_client.js", "application/javascript"),
        ]

        for url, expected_type in urls:
            try:
                req = urllib.request.Request(url)
                with urllib.request.urlopen(req, timeout=3) as resp:
                    status = resp.status
                    content_type = resp.headers.get("Content-Type", "")
                    body = resp.read()
                    self.assertEqual(status, 200, f"URL {url} returned status {status}")
                    self.assertTrue(expected_type in content_type, f"Expected {expected_type} in {content_type} for {url}")
                    self.assertGreater(len(body), 50, f"Content empty for {url}")
                    print(f"  [PASS] Endpoint {url} -> HTTP 200 OK ({len(body)} bytes)")
            except Exception as e:
                self.fail(f"Failed to fetch {url}: {e}")

    def test_08_index_html_dom_structure(self):
        """Verify index.html contains all required UI IDs for the mobile RAG workflow."""
        with urllib.request.urlopen("http://localhost:8080/", timeout=3) as resp:
            html = resp.read().decode("utf-8")

        required_ids = [
            'id="app-root"',
            'id="search-input"',
            'id="camera-btn"',
            'id="quick-presets"',
            'id="latency-telemetry"',
            'id="machine-title"',
            'id="seat-adjustment-tip"',
            'id="setup-steps-list"',
            'id="muscle-diagram-container"',
            'id="view-manual-btn"',
            'id="camera-modal"',
            'id="read-audio-btn"'
        ]

        for dom_id in required_ids:
            self.assertIn(dom_id, html, f"DOM element {dom_id} missing from index.html")

        print(f"  [PASS] index.html contains all {len(required_ids)} required mobile interactive components.")

if __name__ == "__main__":
    print("\n==================================================================")
    print("SPOTCHECK RAG: COMPREHENSIVE AUTOMATED VERIFICATION SUITE")
    print("==================================================================")
    runner = unittest.TextTestRunner(verbosity=1)
    suite = unittest.TestLoader().loadTestsFromTestCase(TestSpotCheckRAG)
    res = runner.run(suite)
    if not res.wasSuccessful():
        sys.exit(1)
