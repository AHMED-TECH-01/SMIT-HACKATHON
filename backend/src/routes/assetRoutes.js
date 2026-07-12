const express = require('express');
const {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
} = require('../controllers/assetController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get('/', authMiddleware, getAssets);
router.get('/:id', authMiddleware, getAssetById);
router.post('/', authMiddleware, createAsset);
router.put('/:id', authMiddleware, updateAsset);
router.delete('/:id', authMiddleware, deleteAsset);

module.exports = router;
