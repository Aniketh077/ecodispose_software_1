const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairController');
const { protect, admin } = require('../middlewares/auth');

// Public route for creating repair requests
router.post('/', repairController.createRepairRequest);

// Admin routes (require authentication)
router.get('/', protect, admin, repairController.getAllRepairRequests);
router.get('/:id', protect, admin, repairController.getRepairRequestById);
router.put('/:id', protect, admin, repairController.updateRepairRequest);
router.delete('/:id', protect, admin, repairController.deleteRepairRequest);

module.exports = router;