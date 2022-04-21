import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Address from '../models/addressModel.js';
// import redisClient from '../server'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (user && (await user.matchPassword(password))) {
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    req.session.user = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };

    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({user: req.params.id});

  if (address.length > 0) {
    res.send(address);
  } else {
    const newAddress = await Address.create({
      user: req.params.id,
      address: req.body,
    });
    res.send(newAddress);
  }
});
const updateUserAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({user: req.params.id});

  if (address.length > 0) {
    await Address.updateOne(
      {user: req.params.id},
      {$set: {billingAddress: req.body[0], shippingAddress: req.body[1]}}
    );
    const updatedAddress = await Address.find({user: req.params.id});
    res.send(updatedAddress);
  }
});
export {authUser, registerUser, getUserById, getUserAddress, updateUserAddress};
