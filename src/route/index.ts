import { Router } from "express";
import userRouter from './user/index';

const router = Router();

router.use('/users', userRouter);

export default router
