import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import {Email} from '../email.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
    lineItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body.order;

  const user = req.body.user;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      lineItems,
      user,
      shippingAddress,
      billingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByUserId = asyncHandler(async (req, res) => {
  const order = await Order.find({user: req.params.id});

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

const orderEmail = asyncHandler(async (req, res) => {
  const html = req.body.html;
  const to = req.body.to;

  await new Email(html, to).sendOrder();
});

export {
  addOrderItems,
  getOrderById,
  getOrderByUserId,
  getMyOrders,
  getOrders,
  orderEmail,
};
