import { Router } from "express";
import userRouter from './user/index';

const router = Router();
console.log('./')
router.use('/users', userRouter);
// router.use('/games', gameRouter);

export default router