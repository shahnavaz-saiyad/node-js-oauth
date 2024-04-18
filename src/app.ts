import express from 'express';

import { userRouter } from './routes/UserRouter';
import { authRouter } from './routes/AuthRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());

app.use('/users', userRouter);
app.use('/oauth', authRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});