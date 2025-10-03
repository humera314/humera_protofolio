# GenAI Addon (LLM + Prompt Engineering)

This drop-in addon adds a small prompt-to-parameters demo to your portfolio.

## What it shows
- Simple prompt engineering: the system prompt constrains output to a strict JSON schema.
- Function-style output (JSON) ready to drive your existing Nebula/Comet scene.
- Graceful fallback: if no `OPENAI_API_KEY` is set, a tiny heuristic still returns usable params.

## Files
- `server/ai-server.ts` – Express API that calls OpenAI (or uses heuristic fallback).
- `src/components/AICometDirector.tsx` – UI component to enter prompts and preview JSON.
- `src/pages/AIShowcase.tsx` – A ready-made page to demo the feature.

## Run backend
1. `npm i express cors dotenv node-fetch`
2. `npm i -D tsx @types/express`
3. `OPENAI_API_KEY=your_openai_api_key_here... npx tsx server/ai-server.ts`
   - Defaults to `http://localhost:8787`

## Wire into your app
- Import the page at a route (e.g., `/ai`) depending on your router.
- Or embed the component into your homepage and pass `endpoint` if needed.

## Next steps (ideas)
- Add a "Prompt Presets" dropdown (fast comet, cinematic, crescent moon, etc.).
- Save/Load scenes with localStorage.
- Record 5-second WebM snippets to insert into your "Welcome" intro.
- Add evaluation: compare two prompts and auto-pick the smoother output.
