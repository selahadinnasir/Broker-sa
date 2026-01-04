import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Broker from '../models/Broker.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register broker
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !phone || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const brokerExists = await Broker.findOne({ email });
  if (brokerExists) {
    res.status(400);
    throw new Error('Broker already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const broker = await Broker.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  res.status(201).json({
    _id: broker._id,
    name: broker.name,
    email: broker.email,
    token: generateToken(broker._id),
  });
});

// @desc    Login broker
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const broker = await Broker.findOne({ email });

  if (broker && (await bcrypt.compare(password, broker.password))) {
    res.json({
      user: broker,
      token: generateToken(broker._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
