import { Router, Request, Response } from "express";
import { User } from '../../models/User';
import { DB } from '../../models/db';

const router = Router();
const db = new DB();

router.post('/:user_id', (req: Request , res: Response) => {
  const { user_id } = req.params;
  const { station, train } = req.body.data;

  const userInfo = <User>{ nickname: user_id, station, train };

  db.create(userInfo);

  res.json({ success: true })
})

export default router;
