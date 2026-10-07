"""
FastHTML Mobile Web App: On-the-Spot Machine Setup Specialist
"""

from fasthtml.common import *
import json
from rag_engine import LanceDBGymEngine

app, rt = fast_app(
    hdrs=(
        Meta(name="viewport", content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"),
        Meta(name="theme-color", content="#090c10"),
        Link(rel="stylesheet", href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=JetBrains+Mono:wght@500;700&display=swap"),
        Style("""
            body { font-family: 'Outfit', sans-serif; background: #090c10; color: #f8fafc; margin: 0; padding: 12px; }
            .container { max-width: 480px; margin: 0 auto; background: #10151e; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 18px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
            .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 14px; }
            .badge-fast { background: #00f5d4; color: #000; font-weight: 800; font-size: 0.7rem; padding: 3px 8px; border-radius: 999px; }
            .search-box { display: flex; gap: 8px; margin-bottom: 14px; }
            .input-text { flex: 1; padding: 12px; background: #161e2b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 0.9rem; }
            .btn-search { background: #00f5d4; color: #000; font-weight: 800; border: none; padding: 10px 16px; border-radius: 12px; cursor: pointer; }
            .telemetry-card { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 10px 14px; margin-bottom: 14px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
            .seat-tip-box { background: rgba(255, 208, 0, 0.12); border: 1px solid rgba(255, 208, 0, 0.4); border-radius: 12px; padding: 14px; margin-bottom: 14px; }
            .tip-title { font-weight: 800; font-size: 0.72rem; color: #ffd000; letter-spacing: 0.05em; margin-bottom: 4px; }
            .steps-card { background: #161e2b; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 16px; margin-bottom: 14px; }
            .steps-title { font-weight: 800; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px; }
            .step-item { display: flex; gap: 10px; margin-bottom: 10px; font-size: 0.88rem; line-height: 1.4; }
            .step-num { background: #00f5d4; color: #000; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; flex-shrink: 0; }
            .pin-highlight { color: #ffe600; font-weight: 700; background: rgba(255,208,0,0.18); padding: 1px 4px; border-radius: 4px; }
            .footer-tag { font-size: 0.7rem; color: #64748b; font-family: 'JetBrains Mono', monospace; text-align: center; }
        """)
    )
)

engine = LanceDBGymEngine()

def format_bold(text: str):
    import re
    return re.sub(r'\*\*(.*?)\*\*', r'<span class="pin-highlight">\1</span>', text)

def render_result_card(data):
    machine = data["machine"]
    summary = data["summary"]
    telemetry = data["telemetry"]

    step_elements = []
    for idx, step in enumerate(summary["steps"][:3]):
        step_elements.append(
            Div(
                Span(str(idx + 1), cls="step-num"),
                Span(NotStr(format_bold(step))),
                cls="step-item"
            )
        )

    return Div(
        Div(
            Span(f"⚡ {telemetry['total_pipeline_ms']}ms TOTAL LATENCY", style="color: #34d399; font-weight: 700;"),
            Span(f" (Vector: {telemetry['vector_search_ms']}ms | LLM: {telemetry['llm_inference_ms']}ms)"),
            cls="telemetry-card"
        ),
        Div(
            Span(machine["brand"].upper(), style="font-size: 0.65rem; color: #ffd000; font-weight: 800;"),
            H2(machine["name"], style="margin: 4px 0 10px 0; font-size: 1.15rem; color: #fff;"),
        ),
        Div(
            Div("SEAT HEIGHT ADJUSTMENT TIP", cls="tip-title"),
            P(NotStr(format_bold(summary["seat_tip"])), style="margin: 0; font-size: 0.86rem; color: #fff;"),
            cls="seat-tip-box"
        ),
        Div(
            Div("STRICT 3-STEP SETUP GUIDE", cls="steps-title"),
            *step_elements,
            cls="steps-card"
        ),
        Div(
            P(f"Source: {machine['manual_ref']}", cls="footer-tag")
        ),
        id="result-zone"
    )

@rt("/")
def get():
    initial_data = engine.run_pipeline("Hammer Strength Iso-Lateral Front Lat Pulldown")
    return Titled(
        "SpotCheck RAG",
        Div(
            Div(
                Div(
                    H1("SpotCheck RAG", style="margin: 0; font-size: 1.1rem;"),
                    P("Machine Setup Specialist", style="margin: 0; font-size: 0.7rem; color: #00f5d4; font-weight: 700;"),
                ),
                Span("SUB-2s SLA", cls="badge-fast"),
                cls="header"
            ),
            Form(
                Input(type="text", name="query", value="Hammer Strength Iso-Lateral Front Lat Pulldown", cls="input-text", placeholder="Search machine name..."),
                Button("Search", type="submit", cls="btn-search"),
                hx_post="/search",
                hx_target="#result-zone",
                cls="search-box"
            ),
            render_result_card(initial_data),
            cls="container"
        )
    )

@rt("/search")
def post(query: str):
    data = engine.run_pipeline(query or "Hammer Strength Iso-Lateral Front Lat Pulldown")
    return render_result_card(data)

if __name__ == "__main__":
    serve(host="0.0.0.0", port=5001)
