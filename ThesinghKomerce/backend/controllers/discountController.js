import asyncHandler from 'express-async-handler';
import Discount from '../models/discountModel.js';

export const createDiscount = asyncHandler(async (req, res) => {
  const {
    discountCode,
    discountValue,
    status,
    isApplicableToAll,
    specificProducts,
    startDate,
    endDate,
  } = req.body;

  const discount = await Discount.create({
    discountCode,
    discountValue,
    status,
    isApplicableToAll,
    specificProducts,
    startDate,
    endDate,
  });
  res.status(201).json(discount);
});

export const getDiscounts = asyncHandler(async (req, res) => {
  const discounts = await Discount.find({});
  res.json(discounts);
});

export const updateDiscount = asyncHandler(async (req, res) => {
  const {
    discountCode,
    discountValue,
    status,
    isApplicableToAll,
    specificProducts,
    startDate,
    endDate,
  } = req.body;

  const discount = await Discount.findById(req.params.id);

  if (discount) {
    discount.discountCode = discountCode;
    discount.discountValue = discountValue;
    discount.status = status;
    discount.isApplicableToAll = isApplicableToAll;
    discount.specificProducts = specificProducts;
    discount.startDate = startDate;
    discount.endDate = endDate;

    const updatedDiscount = await discount.save();
    res.json(updatedDiscount);
  } else {
    res.status(404);
    throw new Error('discount not found');
  }
});

export const getDiscountById = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  if (discount) {
    res.json(discount);
  } else {
    res.status(404);
    throw new Error('Discount not found');
  }
});

export const getDiscountByCode = asyncHandler(async (req, res) => {
  const discountCode = req.params.discountCode;
  const discount = await Discount.find({discountCode});
  const today = new Date().getTime();
  const valid =
    discount[0]?.status &&
    today < discount[0]?.endDate.getTime() &&
    today > discount[0]?.startDate.getTime();

  if (discount.length && valid) res.json({status: true, discount: discount[0]});
  else if (discount.length && valid === false) {
    res.json({status: false, error: 'Inactive Coupon'});
  } else res.json({status: false, error: 'Invalid Coupon'});
});

export const getDiscountByIdUserSide = asyncHandler(async (req, res) => {
  const discountId = req.params.discountId;
  const discount = await Discount.findById(discountId);
  const today = new Date().getTime();
  const valid =
    discount.status &&
    today < discount.endDate.getTime() &&
    today > discount.startDate.getTime();

  if (discount) res.json({status: true, discount});
  else if (discount.length && !valid) {
    res.json({status: false, error: 'Inactive Coupon'});
  } else res.json({status: false, error: 'Invalid Coupon'});
});

export const deleteDiscount = asyncHandler(async (req, res) => {
  const discountId = req.params.id;
  await Discount.deleteOne({_id: discountId});
  res.json('deleted');
});
