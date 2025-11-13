const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod;
beforeAll(async ()=>{
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  await require('../server');
  await new Promise(r=>setTimeout(r,500));
}, 20000);
afterAll(async ()=>{ await mongod.stop(); });
test('health endpoint', async ()=>{
  const res = await request('http://localhost:5000').get('/api/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});
test('register and login', async ()=>{
  const agent = request('http://localhost:5000');
  await agent.post('/api/auth/register').send({ name:'T', email:'t@example.com', password:'pass123' });
  const login = await agent.post('/api/auth/login').send({ email:'t@example.com', password:'pass123' });
  expect(login.status).toBe(200);
  expect(login.body.access).toBeDefined();
}, 20000);
