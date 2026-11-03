const Tutor = require('../models/Tutor');

// GET /api/tutors  (optionally filter by ?subject=python)
const getAllTutors = async (req, res) => {
  try {
    const { subject } = req.query;
    const filter = subject ? { subjectId: subject.toLowerCase() } : {};
    const tutors = await Tutor.find(filter).sort({ rating: -1 });
    res.json({ success: true, count: tutors.length, data: tutors });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/tutors/:id
const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ id: req.params.id });
    if (!tutor) {
      return res.status(404).json({ success: false, message: 'Tutor not found' });
    }
    res.json({ success: true, data: tutor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = { getAllTutors, getTutorById };

