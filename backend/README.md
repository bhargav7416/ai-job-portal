# Backend — AI Job Portal Boilerplate v2

## Run locally
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev

Open: http://localhost:5000/api/health

## Seed
node scripts/seed.js

## Tests
npm test

## AI mocks
If OPENAI_API_KEY or PINECONE_API_KEY are not set, AI endpoints return mocked responses. See backend/config/ai.js
