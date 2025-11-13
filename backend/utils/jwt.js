const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.JWT_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
module.exports = {
  signAccess: (payload) => jwt.sign(payload, ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' }),
  signRefresh: (payload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }),
  verifyAccess: (token) => jwt.verify(token, ACCESS_SECRET),
  verifyRefresh: (token) => jwt.verify(token, REFRESH_SECRET)
};
