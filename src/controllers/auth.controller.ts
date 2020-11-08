import { Request, Response } from 'express';
import User from '../models/User';

const getCurrentUser = async (req: Request, res: Response) => {
  // res.send('GET CURRENT USER HERE');
};

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
    console.log(error.message);
    res.json({ msg: error.message });
  }
};

const loginUser = (req: Request, res: Response) => {
  res.send('LOGIN USER HERE');
};

export { getCurrentUser, registerUser, loginUser };
