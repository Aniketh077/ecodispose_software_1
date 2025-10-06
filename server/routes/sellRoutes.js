const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sellController');
const { verifyToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');

router.post('/', sellController.createSellRequest);

router.get('/', verifyToken, isAdmin, sellController.getAllSellRequests);
router.get('/:id', verifyToken, isAdmin, sellController.getSellRequestById);
router.put('/:id', verifyToken, isAdmin, sellController.updateSellRequest);
router.delete('/:id', verifyToken, isAdmin, sellController.deleteSellRequest);

module.exports = router;
