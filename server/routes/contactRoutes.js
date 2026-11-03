const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', getAllContacts);

module.exports = router;

