const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, index: { unique: true } },
  avatar: String,
});

module.exports = mongoose.model('User', UserSchema);
