# AI Job Portal Boilerplate v2 (Corrected)

This is a corrected, runnable boilerplate for an **AI-Enhanced Job Portal** (MERN + AI mock).
It includes working MVP endpoints, a simple React + Vite frontend, Dockerfiles, docker-compose, seed script, and tests.

## Quick verification (backend)
```bash
cd backend
npm install
cp .env.example .env     # or copy on Windows: copy .env.example .env
npm run dev
# open: http://localhost:5000/api/health  -> {"status":"ok"}
```

## Quick verification (frontend)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# open: http://localhost:5173
```

## Docker-compose (optional)
From repo root:
```
docker compose up --build
```

## Seed demo data
```bash
cd backend
node scripts/seed.js
```

## Tests (backend)
```bash
cd backend
npm test
```

Notes:
- AI endpoints are mocked when OPENAI_API_KEY / PINECONE_API_KEY are not set. Check `backend/config/ai.js`.
- If you want me to enable full OpenAI + Pinecone integration next, tell me and I'll add the code (you'll need API keys).
