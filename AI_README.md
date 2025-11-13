# AI Integration Notes (v2)

This project ships with AI endpoints mocked when OPENAI_API_KEY or PINECONE_API_KEY are not set.
Files to inspect:
- backend/config/ai.js  -> mock toggles and sample responses
- backend/controllers/ai.controller.js -> where to implement real OpenAI + Pinecone calls

To enable real OpenAI:
1. npm install openai
2. Implement the calls in controllers using process.env.OPENAI_API_KEY

To enable Pinecone:
1. install pinecone-client and configure the index using process.env.PINECONE_API_KEY and PINECONE_ENV
