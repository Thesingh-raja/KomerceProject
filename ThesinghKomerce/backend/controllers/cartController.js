import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const addCartItems = asyncHandler(async (req, res) => {
  const {product, qty} = req.body.cart;
  const user = req.body.userInfo._id;
  if (product && product.length === 0) {
    res.status(400);
    throw new Error('No Cart items');
  } else {
    const cart = new Cart({
      product,
      qty,
      user,
    });
    const createdCart = await cart.save();
    res.status(201).json(createdCart);
  }
});

export const getCartItemsByUserId = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({user: req.params.id});
  const arrayCart =
    cartItems.length > 0
      ? cartItems.map(async datas => {
          const response = await Product.findOne({_id: datas.product});
          return {response, qty: datas.qty, cartData: datas};
        })
      : [];
  res.send(await Promise.all(arrayCart));
});

export const deleteEntireCartItem = asyncHandler(async (req, res) => {
  await Cart.deleteMany({user: req.params.id});
  res.send('cart deleted');
});

export const removeCartItembyId = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (cart) {
    await cart.remove();
    res.json({message: 'Cart removed'});
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export const updateCartItemById = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (cart) cart.qty = req.params.qty;
  const updatedCart = await cart.save();
  res.json(updatedCart);
});

export const addDiscountToCart = asyncHandler(async (req, res) => {
  const user = req.params.id;
  const discountId = req.params.discount;
  const carts = await Cart.find({user});
  let updatedCart;
  carts.forEach(async cart => {
    if (discountId !== 'undefined')
      updatedCart = await Cart.findByIdAndUpdate(cart._id, {
        discount: discountId,
      });
    else
      updatedCart = await Cart.findByIdAndUpdate(cart._id, {
        discount: '',
        discountValue: 0,
      });
  });
  res.json(updatedCart);
});

export const updateDiscountValueToCart = asyncHandler(async (req, res) => {
  const specific = req.body.Arr;
  const user = req.body.userId;
  if (specific.length) {
    specific.forEach(async prod => {
      await Cart.findOneAndUpdate(
        {product: prod, user},
        {discountValue: req.params.value}
      );
    });
  } else {
    await Cart.updateMany({user}, {discountValue: req.params.value});
  }
  res.json('updated');
});

export const overAllUpdateQty = asyncHandler(async (req, res) => {
  const arr = req.body;
  arr.map(async el => {
    if (el.qty) await Cart.findByIdAndUpdate(el.id, {qty: el.qty});
    else await Cart.findOneAndDelete({_id: el.id});
  });
  res.send('success');
});
