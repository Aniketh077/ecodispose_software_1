const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sellController');
const { protect, admin } = require('../middlewares/auth');

// Public route for creating sell requests
router.post('/', sellController.createSellRequest);

// Admin routes (require authentication)
router.get('/', protect, admin, sellController.getAllSellRequests);
router.get('/:id', protect, admin, sellController.getSellRequestById);
router.put('/:id', protect, admin, sellController.updateSellRequest);
router.delete('/:id', protect, admin, sellController.deleteSellRequest);

module.exports = router;