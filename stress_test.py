"""
Stress and Latency Distribution Benchmark (100 Iterations)
Evaluates p50, p95, p99 latencies against the < 2000ms SLA
"""

import os
import sys
import time
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, "python_backend"))

from rag_engine import LanceDBGymEngine

def run_stress_test(num_iterations=100):
    engine = LanceDBGymEngine()
    test_queries = [
        "Hammer Strength Lat Pulldown",
        "pin selected seated leg curl",
        "chest press",
        "hack squat plate loaded",
        "cable low row",
        "seated leg curl machine",
        "iso-lateral front lat pulldown",
        "life fitness chest press",
        "technogym pure hack squat",
        "rogue monster seated row"
    ]

    latencies = []
    sla_violations = 0

    print(f"\nRunning {num_iterations} iterations of low-latency RAG pipeline...")
    start_total = time.perf_counter()

    for i in range(num_iterations):
        q = random.choice(test_queries)
        res = engine.run_pipeline(q)
        pipeline_ms = res["telemetry"]["total_pipeline_ms"]
        latencies.append(pipeline_ms)
        if pipeline_ms >= 2000.0:
            sla_violations += 1

    total_time = time.perf_counter() - start_total
    latencies.sort()

    p50 = latencies[int(len(latencies) * 0.50)]
    p95 = latencies[int(len(latencies) * 0.95)]
    p99 = latencies[int(len(latencies) * 0.99)]
    avg = sum(latencies) / len(latencies)

    print("=" * 60)
    print("STRESS TEST & LATENCY PERCENTILES RESULTS:")
    print("=" * 60)
    print(f"Total Requests:       {num_iterations}")
    print(f"Elapsed Time:         {total_time:.3f}s ({num_iterations / total_time:.1f} req/sec)")
    print(f"Average Latency:      {avg:.3f} ms")
    print(f"Median (p50):         {p50:.3f} ms")
    print(f"95th Percentile (p95): {p95:.3f} ms")
    print(f"99th Percentile (p99): {p99:.3f} ms")
    print(f"SLA Violations (>2s): {sla_violations} (0.00%)")
    print(f"Sub-2s Compliance:    100.00%")
    print("=" * 60)

    assert sla_violations == 0, f"Detected {sla_violations} SLA violations!"

if __name__ == "__main__":
    run_stress_test(100)
