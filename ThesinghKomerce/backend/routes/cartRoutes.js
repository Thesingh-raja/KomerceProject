import express from 'express';
const router = express.Router();
import {
  addCartItems,
  addDiscountToCart,
  getCartItemsByUserId,
  removeCartItembyId,
  updateCartItemById,
  deleteEntireCartItem,
  updateDiscountValueToCart,
  overAllUpdateQty,
} from '../controllers/cartController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

router.route('/add').post(addCartItems);
router.route('/:id').get(getCartItemsByUserId).delete(removeCartItembyId);
router.route('/delete-cart/:id').delete(deleteEntireCartItem);
router.route('/update-discount-value/:value').post(updateDiscountValueToCart);
router.route('/:id/:qty').put(updateCartItemById);
router.route('/add-discount/:id/:discount').put(addDiscountToCart);
router.route('/overall-update').post(overAllUpdateQty);

export default router;
