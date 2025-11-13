const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending','reviewed','accepted','rejected','withdrawn'], default: 'pending' },
  cover_letter: String,
  resume_url: String,
  match_score: Number,
  applied_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Application', ApplicationSchema);
