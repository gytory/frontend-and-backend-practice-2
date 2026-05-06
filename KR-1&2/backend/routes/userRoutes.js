const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { ROLES } = require('../config/constants');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.getUserById);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.updateUser);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.blockUser);

module.exports = router;