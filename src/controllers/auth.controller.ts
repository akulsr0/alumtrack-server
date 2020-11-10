import { Request, Response } from 'express';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/index';
import User from '../models/User';

// @route GET /api/auth/
// @desc Get current user
// @access Private
const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const user = await User.findById(id).select('-password');
  res.json({ user });
};

// @route POST /api/auth/
// @desc Register a new user
// @access Public
const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      username,
      gender,
      email,
      password,
      phone,
    } = req.body;
    const user = new User({
      firstname,
      lastname,
      username,
      gender,
      email,
      password,
      phone,
    });
    await user.save();
    res.json({ message: 'User Registered', user, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route POST /api/auth/login
// @desc Login Existing User
// @access Public
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email) {
      return res.json({ message: 'Email not provided', success: false });
    }
    if (!password) {
      return res.json({ message: 'Password not provided', success: false });
    }
    if (!validator.isEmail(email)) {
      return res.json({ message: 'Invalid Email', success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User doesn't exist", success: false });
    }
    const authResult = await user.validatePassword(password);
    if (authResult) {
      const token = await jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '10 days',
      });
      return res.json({ message: 'Login Successfull', token, success: true });
    }
    res.json({ message: 'Invalid Credentials', success: false });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export { getCurrentUser, registerUser, loginUser };
