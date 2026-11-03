const Subject = require('../models/Subject');

// GET /api/subjects
const getAllSubjects = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const subjects = await Subject.find(filter).sort({ category: 1, name: 1 });
    res.json({ success: true, count: subjects.length, data: subjects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/subjects/:id
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findOne({ id: req.params.id });
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }
    res.json({ success: true, data: subject });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = { getAllSubjects, getSubjectById };

