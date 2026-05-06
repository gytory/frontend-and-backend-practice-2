const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { ROLES } = require('../config/constants');

router.post('/', authMiddleware, roleMiddleware([ROLES.SELLER, ROLES.ADMIN]), productController.createProduct);
router.get('/', authMiddleware, roleMiddleware([ROLES.USER, ROLES.SELLER, ROLES.ADMIN]), productController.getAllProducts);
router.get('/:id', authMiddleware, roleMiddleware([ROLES.USER, ROLES.SELLER, ROLES.ADMIN]), productController.getProductById);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.SELLER, ROLES.ADMIN]), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), productController.deleteProduct);

module.exports = router;