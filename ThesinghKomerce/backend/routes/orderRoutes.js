import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getOrderById,
  getOrderByUserId,
  getMyOrders,
  getOrders,
  orderEmail,
} from '../controllers/orderController.js';
const router = express.Router();
router.route('/:id').get(getOrderById);
router.route('/myorders').get(getMyOrders);
router.route('/user/:id').get(getOrderByUserId);
router.route('/').post(addOrderItems).get(getOrders);
router.route('/order-email').post(orderEmail);

export default router;
