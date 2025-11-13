const ai = require('../config/ai');
const multer = require('multer');
const upload = multer();
exports.parseResume = [upload.single('file'), async (req, res, next) => {
  try {
    if (ai.isMock) return res.json({ parsed: ai.parseResumeMock(), mocked: true });
    return res.json({ parsed: {}, mocked: false });
  } catch (err) { next(err); }
}];
exports.matchScore = async (req, res) => {
  if (ai.isMock) return res.json(ai.matchScoreMock());
  res.json({ score: 0 });
};
exports.chat = async (req, res) => {
  if (ai.isMock) return res.json(ai.chatMock(req.body.question));
  res.json({ answer: 'real impl placeholder' });
};
