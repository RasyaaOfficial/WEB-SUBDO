const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginValidationRules, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/api/login', loginValidationRules, validate, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase(), role });
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    // Create JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role, nama: user.nama },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ message: 'Login berhasil', token, role: user.role, nama: user.nama, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error saat login' });
  }
});

module.exports = router;
