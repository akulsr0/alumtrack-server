import mongoose from 'mongoose';

const DB_CLOUD_URI: string | undefined = process.env.DB_URI;
const DB_LOCAL_URI: string = `mongodb://localhost:27017/my_database`;

export const DB_URI = DB_CLOUD_URI || DB_LOCAL_URI;

export default (): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
};
