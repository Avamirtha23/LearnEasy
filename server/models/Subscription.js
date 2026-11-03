const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    // Student info (basic — no auth for now)
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Name too long'],
    },
    studentEmail: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    studentPhone: {
      type: String,
      trim: true,
      default: '',
    },

    // Selected Subject
    subjectId: {
      type: String,
      required: [true, 'Subject is required'],
    },
    subjectName: {
      type: String,
      required: true,
    },

    // Selected Tutor
    tutorId: {
      type: String,
      required: [true, 'Tutor is required'],
    },
    tutorName: {
      type: String,
      required: true,
    },
    tutorQualification: {
      type: String,
      default: '',
    },

    // Schedule
    sessionTiming: {
      type: String,
      required: [true, 'Session timing is required'],
      trim: true,
    },
    courseDuration: {
      type: Number,
      required: [true, 'Course duration (months) is required'],
      enum: [1, 2, 3, 4, 6, 12],
    },

    // Financials
    monthlyFee: {
      type: Number,
      required: true,
      min: 0,
    },
    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },

    // Status lifecycle
    status: {
      type: String,
      enum: ['active', 'cancelled', 'completed', 'pending'],
      default: 'active',
    },

    // Start & end dates (auto-computed)
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Auto-compute endDate before save
subscriptionSchema.pre('save', function (next) {
  if (this.startDate && this.courseDuration) {
    const end = new Date(this.startDate);
    end.setMonth(end.getMonth() + this.courseDuration);
    this.endDate = end;
  }
  // Validate totalCost
  if (this.monthlyFee && this.courseDuration) {
    this.totalCost = this.monthlyFee * this.courseDuration;
  }
  next();
});

// Indexes
subscriptionSchema.index({ studentEmail: 1 });
subscriptionSchema.index({ tutorId: 1 });
subscriptionSchema.index({ subjectId: 1 });
subscriptionSchema.index({ status: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);

