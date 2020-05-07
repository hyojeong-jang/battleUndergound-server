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
    const userDocument = await db.create(userInfo);
    res.json({ userDocument });
  } catch (error) {
    console.log(error);
  }
})

router.put('/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const nickname = req.body.data;

  try {
    const userDocument = await db.updateNickname(user_id, nickname);
    res.json({ userDocument });
  } catch (error) {
    console.log(error);
  }
})

export default router;
