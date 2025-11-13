module.exports = {
  isMock: !(process.env.OPENAI_API_KEY && process.env.PINECONE_API_KEY),
  parseResumeMock: () => ({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-5555',
    skills: ['JavaScript', 'Node.js', 'React'],
    experience: [{ company: 'ACME', role: 'Engineer', from: '2019', to: '2023' }]
  }),
  matchScoreMock: () => ({ score: Math.floor(60 + Math.random()*30), strengths: ['React','Node.js'], weaknesses: ['Docker'] }),
  chatMock: (q) => ({ answer: 'Mocked RAG response. Add keys to enable real AI.' })
};
