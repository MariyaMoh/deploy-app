const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const User = require('../models/userModel');


const getNotes = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let condtion = { user: req.user.id };

  if (search) {
    condtion.text = { $regex: search, $options: 'si' };
  }

  const notes = await Note.find(condtion);

  res.status(200).json(notes);
});

const getPublicNote = asyncHandler(async (req, res) => {
  const notes = await Note.find({ is_public: true }).populate('user', 'name');

  res.status(200).json(notes);
});

const setNote = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
    is_public: req.body.is_public,
  });

  res.status(200).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
  getPublicNote,
};
