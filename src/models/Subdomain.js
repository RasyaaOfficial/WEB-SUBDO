const mongoose = require('mongoose');
const { allowedTLDs } = require('../../settings');

const subdomainSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, lowercase: true, trim: true },
  hostname: { type: String, required: true, trim: true },
  ip: { type: String, required: true, trim: true },
  tld: { type: String, enum: allowedTLDs, required: true },
  subdomain: { type: String, required: true }, // e.g. tes.hosting-privateku.web.id
  nodeSubdomain: { type: String, required: true }, // e.g. node.tes.hosting-privateku.web.id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subdomain', subdomainSchema);
