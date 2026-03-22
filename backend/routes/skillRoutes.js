const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSkills, updateSkills, seedSkills } = require('../controllers/skillController');

router.get('/', getSkills);
router.put('/', protect, updateSkills);
router.post('/seed', protect, seedSkills);

module.exports = router;
