const Application = require('../models/Application');
const Job = require('../models/Job');
exports.apply = async (req, res, next) => {
  try {
    const { job_id, cover_letter } = req.body;
    if (!job_id) return res.status(400).json({ error: 'job_id required' });
    const job = await Job.findById(job_id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    const exists = await Application.findOne({ job_id, user_id: req.user.id });
    if (exists) return res.status(400).json({ error: 'Already applied' });
    const app = new Application({ job_id, user_id: req.user.id, cover_letter });
    await app.save();
    res.json(app);
  } catch (err) { next(err); }
};
exports.getByUser = async (req, res, next) => {
  try {
    const apps = await Application.find({ user_id: req.params.userId }).populate('job_id');
    res.json(apps);
  } catch (err) { next(err); }
};
