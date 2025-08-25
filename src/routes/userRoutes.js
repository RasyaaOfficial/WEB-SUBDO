const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { userCreationValidationRules, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(authMiddleware);

// GET /api/users
router.get('/api/users', async (req, res) => {
  const { role, email } = req.user;
  try {
    if (role === 'admin') {
      const users = await User.find({}, '-password').lean();
      return res.json(users);
    }
    if (role === 'reseller') {
      // Users created by reseller have no direct owner field, 
      // so assume reseller can view users with role 'user' (Pengguna Biasa)
      // We may add owner reference later, but spec doesn't require.
      // For now, reseller can see all users with role user.
      const users = await User.find({ role: 'user' }, '-password').lean();
      return res.json(users);
    }
    return res.status(403).json({ message: 'Forbidden: akses hanya untuk reseller dan admin' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error saat mendapatkan daftar pengguna' });
  }
});

// POST /api/users
router.post('/api/users', userCreationValidationRules, validate, async (req, res) => {
  const { role: requesterRole } = req.user;
  const { email, password, nama, role } = req.body;

  if (!['reseller', 'admin'].includes(requesterRole)) {
    return res.status(403).json({ message: 'Forbidden: hanya reseller dan admin yang dapat menambah pengguna' });
  }
  if (role !== 'user' && role !== 'reseller') {
    return res.status(400).json({ message: 'Role harus user atau reseller' });
  }
  try {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      nama,
      role
    });
    await newUser.save();
    return res.status(201).json({ message: 'Pengguna berhasil dibuat', user: { email: newUser.email, nama: newUser.nama, role: newUser.role } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error saat membuat pengguna' });
  }
});

// PUT /api/users/:id
router.put('/api/users/:id', userCreationValidationRules, validate, async (req, res) => {
  const { role: requesterRole } = req.user;
  const { id } = req.params;
  const { email, password, nama, role } = req.body;

  if (!['reseller', 'admin'].includes(requesterRole)) {
    return res.status(403).json({ message: 'Forbidden: hanya reseller dan admin yang dapat mengubah pengguna' });
  }
  if (role !== 'user' && role !== 'reseller') {
    return res.status(400).json({ message: 'Role harus user atau reseller' });
  }
  try {
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    // Admin dapat update siapa saja, reseller hanya bisa update pengguna biasa
    if (requesterRole === 'reseller' && userToUpdate.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden: reseller hanya dapat mengubah pengguna biasa' });
    }
    // Check if email is changed and unique
    if (email.toLowerCase() !== userToUpdate.email) {
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists && exists._id.toString() !== id) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }
    }
    userToUpdate.email = email.toLowerCase();
    userToUpdate.password = password;
    userToUpdate.nama = nama;
    userToUpdate.role = role;
    await userToUpdate.save();
    return res.json({ message: 'Pengguna berhasil diperbarui', user: { email: userToUpdate.email, nama: userToUpdate.nama, role: userToUpdate.role } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error saat memperbarui pengguna' });
  }
});

// DELETE /api/users/:id
router.delete('/api/users/:id', async (req, res) => {
  const { role: requesterRole } = req.user;
  const { id } = req.params;
  if (requesterRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: hanya admin yang dapat menghapus pengguna' });
  }
  try {
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    await userToDelete.deleteOne();
    return res.json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error saat menghapus pengguna' });
  }
});

module.exports = router;
