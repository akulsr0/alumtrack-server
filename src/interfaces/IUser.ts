import { Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname?: string;
  fullname: string;
  username: string;
  password: string;
  gender: string;
  joined: Date;
  validatePassword(plainPass: string): boolean;
  getDateString(date: Date): string;
}

export default IUser;
