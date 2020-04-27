import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import createError, { HttpError } from 'http-errors';
import mongoDB from './config/mongoose';
import router  from './route/index';

dotenv.config();
const app = express();

mongoDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  // next(createError(404, 'Invalid Url'));
});

// app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);

//   res.status(err.status || 500);
//   res.json(err);
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

export default app;

