const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // plaintext per spec (not hashed)
  nama: { type: String, required: true, trim: true },
  role: { type: String, enum: ['user', 'reseller', 'admin'], required: true }
});

module.exports = mongoose.model('User', userSchema);
