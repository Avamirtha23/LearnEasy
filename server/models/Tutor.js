const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    subjectId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    qualification: { type: String, required: true },
    college: { type: String, required: true },
    experience: { type: Number, required: true, min: 0 },
    specialization: { type: String, required: true },
    monthlyFee: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

// Index to speed up filtering by subject
tutorSchema.index({ subjectId: 1 });

module.exports = mongoose.model('Tutor', tutorSchema);

