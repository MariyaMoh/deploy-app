const express = require('express');
const router = express.Router();
const {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
  getPublicNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, setNote);
router.route('/:id').delete(protect, deleteNote).put(protect, updateNote);
router.route('/public').get(protect, getPublicNote);

module.exports = router;
