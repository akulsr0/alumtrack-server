import { Schema, Types, model, Model } from 'mongoose';
import IProject from '../interfaces/IProject';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
  },
  hostedUrl: {
    type: String,
  },
  author: { type: Types.ObjectId, ref: 'user' },
});

const Project: Model<IProject> = model<IProject>('project', projectSchema);
export default Project;
