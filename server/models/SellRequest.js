const mongoose = require('mongoose');

const sellRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  deviceType: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['excellent', 'good', 'fair', 'poor']
  },
  problemDescription: {
    type: String,
    required: true
  },
  accessories: {
    type: String
  },
  purchaseYear: {
    type: Number,
    required: true
  },
  expectedPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  adminNotes: {
    type: String
  },
  offeredPrice: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SellRequest', sellRequestSchema);
