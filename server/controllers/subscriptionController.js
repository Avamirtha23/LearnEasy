const Subscription = require('../models/Subscription');
const Tutor = require('../models/Tutor');
const Subject = require('../models/Subject');

// POST /api/subscriptions  — create a new subscription
const createSubscription = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      studentPhone,
      subjectId,
      tutorId,
      sessionTiming,
      courseDuration,
    } = req.body;

    // --- Required field check ---
    if (!studentName || !studentEmail || !subjectId || !tutorId || !sessionTiming || !courseDuration) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: studentName, studentEmail, subjectId, tutorId, sessionTiming, courseDuration.',
      });
    }

    // --- Look up tutor to get fee & name ---
    const tutor = await Tutor.findOne({ id: tutorId });
    if (!tutor) {
      return res.status(404).json({ success: false, message: `Tutor with id "${tutorId}" not found.` });
    }

    // --- Look up subject name ---
    const subject = await Subject.findOne({ id: subjectId });
    if (!subject) {
      return res.status(404).json({ success: false, message: `Subject with id "${subjectId}" not found.` });
    }

    const monthlyFee = tutor.monthlyFee;
    const totalCost = monthlyFee * Number(courseDuration);

    const subscription = await Subscription.create({
      studentName,
      studentEmail,
      studentPhone: studentPhone || '',
      subjectId,
      subjectName: subject.name,
      tutorId,
      tutorName: tutor.name,
      tutorQualification: tutor.qualification,
      sessionTiming,
      courseDuration: Number(courseDuration),
      monthlyFee,
      totalCost,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully! Welcome to LearnEasy.',
      data: subscription,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('; ') });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/subscriptions  — list all (admin)
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.json({ success: true, count: subscriptions.length, data: subscriptions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/subscriptions/email/:email — subscriptions by student email
const getSubscriptionsByEmail = async (req, res) => {
  try {
    const subs = await Subscription.find({
      studentEmail: req.params.email.toLowerCase(),
    }).sort({ createdAt: -1 });
    res.json({ success: true, count: subs.length, data: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/subscriptions/:id — single subscription
const getSubscriptionById = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ success: false, message: 'Subscription not found' });
    res.json({ success: true, data: sub });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionsByEmail,
  getSubscriptionById,
};

