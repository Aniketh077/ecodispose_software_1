const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairController');
const { verifyToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');

router.post('/', repairController.createRepairRequest);

router.get('/', verifyToken, isAdmin, repairController.getAllRepairRequests);
router.get('/:id', verifyToken, isAdmin, repairController.getRepairRequestById);
router.put('/:id', verifyToken, isAdmin, repairController.updateRepairRequest);
router.delete('/:id', verifyToken, isAdmin, repairController.deleteRepairRequest);

module.exports = router;
