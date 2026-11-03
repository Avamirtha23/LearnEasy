const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionsByEmail,
  getSubscriptionById,
} = require('../controllers/subscriptionController');

router.post('/', createSubscription);
router.get('/', getAllSubscriptions);
router.get('/email/:email', getSubscriptionsByEmail);
router.get('/:id', getSubscriptionById);

module.exports = router;

