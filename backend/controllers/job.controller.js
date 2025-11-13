const Job = require('../models/Job');
exports.createJob = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.posted_by = req.user.id;
    const job = new Job(payload);
    await job.save();
    res.json(job);
  } catch (err) { next(err); }
};
exports.listJobs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(50, parseInt(req.query.limit || '10'));
    const skip = (page - 1) * limit;
    const total = await Job.countDocuments({});
    const data = await Job.find({}).sort({ created_at: -1 }).skip(skip).limit(limit);
    res.json({ data, page, total });
  } catch (err) { next(err); }
};
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Not found' });
    job.views_count = (job.views_count || 0) + 1;
    await job.save();
    res.json(job);
  } catch (err) { next(err); }
};
