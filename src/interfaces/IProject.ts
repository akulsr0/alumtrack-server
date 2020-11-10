import { Document } from 'mongoose';
import IUser from './IUser';

interface IProject extends Document {
  title: string;
  language: string;
  description: string;
  githubLink?: string;
  hostedUrl?: string;
  author?: IUser;
}

export default IProject;
