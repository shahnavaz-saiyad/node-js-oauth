import express from 'express';

import { router as userRouter } from './routes/UserRouter';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});