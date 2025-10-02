// server/ai-server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Simple health
app.get("/health", (_req, res) => res.json({ ok: true }));

// POST /api/scene - turn a natural-language prompt into scene params
app.post("/api/scene", async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing 'prompt' string in body." });
  }

  // If no API key, fallback to a tiny heuristic so the page still works
  if (!OPENAI_API_KEY) {
    const lower = prompt.toLowerCase();
    const contains = (s: string) => lower.includes(s);

    const colors: string[] = [];
    if (contains("red")) colors.push("red");
    if (contains("green")) colors.push("green");
    if (contains("blue")) colors.push("blue");
    if (colors.length === 0) colors.push("cyan");

    const out = {
      tailColors: colors.slice(0, 3),
      cometSpeed: contains("fast") ? 2.2 : contains("slow") ? 0.6 : 1.0,
      cameraOrbit: (contains("orbit") || contains("360")) ? 1 : 0,
      cloudDensity: contains("dense") ? 0.85 : contains("thin") ? 0.25 : 0.5,
      cloudHues: (contains("red") || contains("crimson")) ? ["#ff3b30"] : ["#6495ed"],
      zoomEffect: (contains("zoom") || contains("near")),
      showCrescentMoon: (contains("crescent") || contains("moon")),
    };
    return res.json({ source: "heuristic", params: out });
  }

  try {
    // Use OpenAI Chat Completions to extract a strict JSON object for scene params
    const sys = "You extract clean JSON for a 3D comet/nebula scene controller.\nReturn ONLY JSON, no prose. Keys:\n- tailColors: string[1..3] CSS colors\n- cometSpeed: number (0.1..3)\n- cameraOrbit: 0 | 1  # 1 = orbit camera around center\n- cloudDensity: number (0..1)\n- cloudHues: string[] CSS color hex or names\n- zoomEffect: boolean # zoom in when near, out when far\n- showCrescentMoon: boolean";

    const user = "Describe the scene and pick values for the keys based on this prompt: " + JSON.stringify(prompt);

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!resp.ok) {
      const t = await resp.text();
      return res.status(500).json({ error: "OpenAI error", detail: t });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch (e) { parsed = {}; }

    // Light validation/defaults
    const out = {
      tailColors: Array.isArray(parsed.tailColors) && parsed.tailColors.length ? parsed.tailColors.slice(0,3) : ["#66ccff"],
      cometSpeed: Math.max(0.1, Math.min(3, Number(parsed.cometSpeed) || 1.0)),
      cameraOrbit: parsed.cameraOrbit === 1 ? 1 : 0,
      cloudDensity: Math.max(0, Math.min(1, Number(parsed.cloudDensity) || 0.5)),
      cloudHues: Array.isArray(parsed.cloudHues) ? parsed.cloudHues.slice(0,3) : ["#4b6fff"],
      zoomEffect: !!parsed.zoomEffect,
      showCrescentMoon: !!parsed.showCrescentMoon,
    };

    res.json({ source: "openai", params: out });
  } catch (err: any) {
    res.status(500).json({ error: "Server error", detail: err?.message || String(err) });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`AI scene server running on :${PORT}`);
});
