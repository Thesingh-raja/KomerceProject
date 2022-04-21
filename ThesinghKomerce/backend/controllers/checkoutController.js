import {stripe} from '../server.js';
import asyncHandler from 'express-async-handler';
import Discount from '../models/discountModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import {response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
export const createStripeCheckoutSession = asyncHandler(
  async (req, res, next) => {
    const line_items = req.body.line_items;
    const orderItems = Object.values(req.body.orderItems);
    const url = process.env.URL;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${url}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/checkout/${req.params.id}`,
      client_reference_id: req.params.id,
      line_items,
    });
    orderItems.map(async el => {
      const product = await Product.findById(el.cartData.product);
      product.inventory = product.inventory - el.qty;
      await product.save();
    });

    const order = await Order.findById(req.params.id);

    order.orderedAt = Date.now();
    order.inventoryReduced = true;
    const updatedOrder = await order.save();
    res.status(200).json({
      status: 'success',
      session,
    });
  }
);

export const getStripeSessionDetails = asyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.id);
  const order = await Order.findById(session.client_reference_id);

  const discId = Object.values(order.orderItems[0])[0]?.cartData?.discount;
  if (discId && discId.length) {
    const discount = await Discount.findById(discId);
    if (discount && !order.isPaid) {
      discount.timesUsed++;
      await discount.save();
    }
  }
  if (session.payment_status) {
    if (!order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.params.id,
        status: session.payment_status,
        email_address: session.customer_email,
      };
    }
  }
  const updatedOrder = await order.save();

  res.send(updatedOrder);
});

export const getLineItems = asyncHandler(async (req, res) => {
  const stripeId = req.params.id;

  const session = await stripe.checkout.sessions.listLineItems(req.params.id);

  res.send(session);
});

export const reupdateInventory = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.inventoryReduced) {
    order.inventoryReduced = false;
    const orderItems = Object.values(order.orderItems[0]);
    orderItems.map(async el => {
      const product = await Product.findById(el.cartData.product);
      product.inventory = product.inventory + el.qty;
      await product.save();
    });
    await order.save();
  }
  res.send('success');
});
