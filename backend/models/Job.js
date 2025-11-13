const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  company: String,
  location: String,
  salary_range: { min: Number, max: Number },
  skills_required: { type: [String], index: true },
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  views_count: { type: Number, default: 0 }
});
module.exports = mongoose.model('Job', JobSchema);
