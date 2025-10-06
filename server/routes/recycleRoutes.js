const express = require('express');
const router = express.Router();
const recycleController = require('../controllers/recycleController');
const { protect, admin } = require('../middlewares/auth');

// Public route for creating recycle requests
router.post('/', recycleController.createRecycleRequest);

// Admin routes (require authentication)
router.get('/', protect, admin, recycleController.getAllRecycleRequests);
router.get('/:id', protect, admin, recycleController.getRecycleRequestById);
router.put('/:id', protect, admin, recycleController.updateRecycleRequest);
router.delete('/:id', protect, admin, recycleController.deleteRecycleRequest);

module.exports = router;