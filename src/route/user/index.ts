import { Router, Request, Response } from "express";
import { User } from '../../models/User';
import { DB } from '../../domain/db';

const router = Router();
const db = new DB();

router.post('/:user_id', async (req: Request , res: Response) => {
  const { user_id } = req.params;
  const { station, train } = req.body.data;
  const userInfo = <User>{
    nickname: user_id,
    game_score: 0,
    station,
    train
  };

  try {
    const user = await db.create(userInfo);
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
})

export default router;
