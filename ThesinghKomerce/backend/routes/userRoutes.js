import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';
import {
  authUser,
  registerUser,
  getUserById,
  getUserAddress,
  updateUserAddress,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser);
router.route('/:id').get(getUserById);
router.post('/login', authUser);
router.route('/address/:id').post(getUserAddress);
router.route('/address-update/:id').post(updateUserAddress);

export default router;
