import { Schema, model, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

const userSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
  },
  phone: {
    type: Number,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  joined: {
    type: Date,
    default: new Date(),
  },
});

userSchema
  .virtual('fullname')
  .get(function (this: { firstname: string; lastname: string | undefined }) {
    if (this.lastname) {
      return `${this.firstname} ${this.lastname}`;
    }
    return `${this.firstname}`;
  });

userSchema.pre('save', async function (this: IUser, next) {
  try {
    if (!this.isModified('password')) return next();
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.validatePassword = async function (
  this: IUser,
  plainPass: string
): Promise<boolean> {
  try {
    let result = await bcrypt.compare(plainPass, this.password);
    return result;
  } catch (error) {
    return false;
  }
};

userSchema.methods.getDateString = function (date: Date): string {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  let d: string = dd + '/' + mm + '/' + yyyy;
  return d;
};

const User: Model<IUser> = model<IUser>('user', userSchema);
export default User;
