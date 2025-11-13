const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seeker','employer','admin'], default: 'seeker' },
  profile: { skills: [String] },
  is_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  last_login: Date
});
UserSchema.pre('save', async function(next){ if(!this.isModified('password')) return next(); const salt = await bcrypt.genSalt(10); this.password = await bcrypt.hash(this.password, salt); next(); });
UserSchema.methods.comparePassword = function(password){ return bcrypt.compare(password, this.password); };
module.exports = mongoose.model('User', UserSchema);
