// src/components/AICometDirector.tsx
import React, { useState } from "react";

type SceneParams = {
  tailColors: string[];
  cometSpeed: number;
  cameraOrbit: 0 | 1;
  cloudDensity: number;
  cloudHues: string[];
  zoomEffect: boolean;
  showCrescentMoon: boolean;
};

const defaultParams: SceneParams = {
  tailColors: ["#66ccff", "#88aaff", "#ffffff"],
  cometSpeed: 1.0,
  cameraOrbit: 0,
  cloudDensity: 0.5,
  cloudHues: ["#4b6fff"],
  zoomEffect: true,
  showCrescentMoon: true,
};

export default function AICometDirector({
  onParams,
  endpoint = "http://localhost:8787/api/scene",
}: {
  onParams?: (p: SceneParams) => void;
  endpoint?: string;
}) {
  const [prompt, setPrompt] = useState(
    "Dimmer red & blue nebula, long comet tail (red, green, blue), slow orbit camera 360°, zoom near/far, crescent moon visible."
  );
  const [params, setParams] = useState<SceneParams>(defaultParams);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"heuristic" | "openai" | null>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Request failed");
      setParams(data.params);
      setSource(data.source);
      onParams?.(data.params);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border p-4 md:p-6 shadow-sm bg-black/30 backdrop-blur text-white">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">AI Comet Director</h2>
      <p className="text-sm opacity-80 mb-4">
        Describe your scene in natural language. I’ll translate it into parameters for your 3D nebula/comet.
      </p>
      <textarea
        className="w-full h-28 rounded-lg bg-black/40 border p-3 mb-3 outline-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Make the clouds thinner and bluer, speed up the comet, orbit the camera fully, and show a bright crescent moon."
      />
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={run}
          disabled={busy}
          className="rounded-xl px-4 py-2 border hover:bg-white hover:text-black transition"
        >
          {busy ? "Thinking..." : "Generate Scene Params"}
        </button>
        {source && <span className="text-xs opacity-70">via {source}</span>}
      </div>
      {error && <div className="text-red-400 text-sm mb-3">Error: {error}</div>}
      <pre className="text-xs bg-black/40 border rounded-lg p-3 overflow-auto">{JSON.stringify(params, null, 2)}</pre>
      <p className="text-xs opacity-70 mt-2">
        Wire the JSON above into your existing shader/Three.js controls (tail colors, orbit toggle, speed, cloud density, etc.).
      </p>
    </div>
  );
}
