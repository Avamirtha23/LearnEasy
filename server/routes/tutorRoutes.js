const express = require('express');
const router = express.Router();
const { getAllTutors, getTutorById } = require('../controllers/tutorController');

// GET /api/tutors?subject=python
router.get('/', getAllTutors);
// GET /api/tutors/tutor-py-1
router.get('/:id', getTutorById);

module.exports = router;

