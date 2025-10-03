// src/pages/AIShowcase.tsx
import React, { useState } from "react";
import AICometDirector from "../components/AICometDirector";

export default function AIShowcase() {
  const [params, setParams] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#060816] to-black text-white p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">GenAI Showcase</h1>
        <p className="opacity-80 mb-8">
          A tiny prompt-engineering demo that turns natural language into controllable 3D scene parameters.
          Plug these into your Nebula/Comet components to drive visuals with text.
        </p>
        <AICometDirector onParams={(p) => setParams(p)} />
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">How to integrate with your scene</h3>
          <ol className="list-decimal pl-5 space-y-2 opacity-90">
            <li>Import <code>AICometDirector</code> anywhere in your page or hero section.</li>
            <li>Hook <code>onParams</code> into your Three.js or shader uniforms to update tail colors, speed, orbit, etc.</li>
            <li>Run the local AI server: <code>OPENAI_API_KEY=your_openai_api_key_here... tsx server/ai-server.ts</code>. Without a key, it still works with heuristics.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
