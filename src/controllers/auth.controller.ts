import { Request, Response } from 'express';
import User from '../models/User';

// @route GET /api/auth/
// @desc Get current user
// @access Private
const getCurrentUser = async (req: Request, res: Response) => {
  // TODO: Get Current User
};

// @route POST /api/auth/
// @desc Register a new user
// @access Public
const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, gender, email, password } = req.body;
    const user = new User({
      firstname,
      lastname,
      username,
      gender,
      email,
      password,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// @route POST /api/auth/login
// @desc Login Existing User
// @access Public
const loginUser = (req: Request, res: Response) => {
  // TODO: Login User
};

export { getCurrentUser, registerUser, loginUser };
