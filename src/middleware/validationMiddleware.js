const { body, validationResult } = require('express-validator');
const { allowedTLDs } = require('../../settings');

const loginValidationRules = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong'),
  body('role').isIn(['user', 'reseller', 'admin']).withMessage('Role tidak valid')
];

const userCreationValidationRules = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong'),
  body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
  body('role').isIn(['user', 'reseller']).withMessage('Role harus user atau reseller')
];

const subdomainCreationValidationRules = [
  body('hostname')
    .matches(/^[a-zA-Z0-9.-]+$/)
    .withMessage('Hostname hanya boleh berisi alphanumeric, titik, dan tanda hubung'),
  body('ip')
    .matches(/^(\d{1,3}\.){3}\d{1,3}$/)
    .withMessage('IP tidak valid'),
  body('tld')
    .isIn(allowedTLDs)
    .withMessage('TLD tidak valid')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    return res.status(400).json({ message: 'Validasi gagal', errors: extractedErrors });
  }
  next();
};

module.exports = {
  loginValidationRules,
  userCreationValidationRules,
  subdomainCreationValidationRules,
  validate
};
