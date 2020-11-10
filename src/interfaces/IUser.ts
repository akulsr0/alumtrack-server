import { Document } from 'mongoose';
import IProject from './IProject';

interface IUser extends Document {
  firstname: string;
  lastname?: string;
  fullname: string;
  username: string;
  photo?: string;
  phone?: number;
  bio?: string;
  isPhoneVerified: boolean;
  password: string;
  gender: string;
  projects: Array<IProject>;
  joined: Date;
  validatePassword(plainPass: string): boolean;
  getDateString(date: Date): string;
}

export default IUser;
