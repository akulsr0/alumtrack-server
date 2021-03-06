import express, { Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './db';

config();
const app: Application = express();
const port: string = process.env.PORT || '5000';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/user/', require('./routes/api/user'));
app.use('/api/project/', require('./routes/api/project'));

app.listen(port, () => {
  console.log(`Server started running at port ${port}`);
  connectDB()
    .then(() => console.log(`Database Connected`))
    .catch((err) => console.log(err));
});
