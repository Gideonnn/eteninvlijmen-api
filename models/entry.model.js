const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  year: { type: Number, required: true },
  week: { type: Number, required: true },
  preferences: [],
});

EntrySchema.index({ name: 1, year: 1, week: 1 }, { unique: true });

module.exports = mongoose.model('Entry', EntrySchema);
