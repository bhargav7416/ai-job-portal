const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwtUtil = require('../utils/jwt');
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const user = new User({ name, email, password, role });
    await user.save();
    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (err) { next(err); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const access = jwtUtil.signAccess({ id: user._id, role: user.role });
    const refresh = jwtUtil.signRefresh({ id: user._id });
    await RefreshToken.create({ user: user._id, token: refresh, expiresAt: new Date(Date.now() + 7*24*3600*1000) });
    res.cookie('refreshToken', refresh, { httpOnly: true, secure: false, sameSite: 'lax', path: '/api/auth' });
    res.json({ access, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (err) { next(err); }
};
exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });
    const payload = jwtUtil.verifyRefresh(token);
    const dbToken = await RefreshToken.findOne({ token });
    if (!dbToken) return res.status(401).json({ error: 'Refresh not found' });
    await RefreshToken.deleteOne({ token });
    const newRefresh = jwtUtil.signRefresh({ id: payload.id });
    await RefreshToken.create({ user: payload.id, token: newRefresh, expiresAt: new Date(Date.now() + 7*24*3600*1000) });
    const access = jwtUtil.signAccess({ id: payload.id });
    res.cookie('refreshToken', newRefresh, { httpOnly: true, secure: false, sameSite: 'lax', path: '/api/auth' });
    res.json({ access });
  } catch (err) { return res.status(401).json({ error: 'Invalid token' }); }
};
exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) await RefreshToken.deleteOne({ token });
    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};
