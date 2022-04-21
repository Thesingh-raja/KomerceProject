import express from 'express';
const router = express.Router();

import {
  createStripeCheckoutSession,
  getStripeSessionDetails,
  getLineItems,
  reupdateInventory,
} from '../controllers/checkoutController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

router.route('/checkout-session/:id').post(createStripeCheckoutSession);
router.route('/session/:id').get(getStripeSessionDetails);
router.route('/reupdate-inventory/:id').get(reupdateInventory);
router.route('/line-items/:id').get(getLineItems);

export default router;
