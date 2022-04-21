import express from 'express';
const router = express.Router();
import {
  deleteDiscount,
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  getDiscountByCode,
  getDiscountByIdUserSide,
} from '../controllers/discountController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

router.route('/').post(createDiscount).get(getDiscounts);
router.route('/discountById/:discountId').post(getDiscountByIdUserSide);
router.route('/:id').get(getDiscountById).put(updateDiscount);
router.route('/discount/:discountCode').get(getDiscountByCode);
router.route('/delete-discount/:id').delete(deleteDiscount);

export default router;
