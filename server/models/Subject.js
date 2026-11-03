const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Programming Languages', 'Academic Subjects'],
    },
    icon: { type: String, default: 'BookOpen' },
    tag: { type: String, default: '' },
    description: { type: String, default: '' },
    popularTopics: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subject', subjectSchema);

