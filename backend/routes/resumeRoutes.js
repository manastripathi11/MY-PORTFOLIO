const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getResume, updateResume } = require('../controllers/resumeController');

router.get('/', getResume);
router.put('/', protect, updateResume);

module.exports = router;
