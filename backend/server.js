const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 60*1000, max: 200 }));

app.use('/api/health', require('./routes/health.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/ai', require('./routes/ai.routes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

async function start() {
  const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-portal';
  await mongoose.connect(MONGO);
  console.log('MongoDB connected');
  const { initSocket } = require('./services/socket.service');
  initSocket(server);
  server.listen(PORT,'0.0.0.0',  () => console.log('Server listening on', PORT));
}

if (require.main === module) start();
module.exports = app;
