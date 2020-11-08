import { Request, Response } from 'express';

const getCurrentUser = (req: Request, res: Response) => {
  res.send('GET CURRENT USER HERE');
};

const registerUser = (req: Request, res: Response) => {
  res.send('REGISTER USER HERE');
};

const loginUser = (req: Request, res: Response) => {
  res.send('LOGIN USER HERE');
};

export { getCurrentUser, registerUser, loginUser };
