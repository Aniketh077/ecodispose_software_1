const express = require('express');
const router = express.Router();
const recycleController = require('../controllers/recycleController');
const { verifyToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');

router.post('/', recycleController.createRecycleRequest);

router.get('/', verifyToken, isAdmin, recycleController.getAllRecycleRequests);
router.get('/:id', verifyToken, isAdmin, recycleController.getRecycleRequestById);
router.put('/:id', verifyToken, isAdmin, recycleController.updateRecycleRequest);
router.delete('/:id', verifyToken, isAdmin, recycleController.deleteRecycleRequest);

module.exports = router;
