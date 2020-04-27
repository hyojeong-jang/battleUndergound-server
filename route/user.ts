import express, { Request, Response, NextFunction } from "express";
import User from '../model/user.model';

const router = express.Router();


router.post('/users/:user_id',(req : Request , res : Response) =>{
  const { user_id } = req.params;
  const { station, train } = req.body.data;

  User.create({
    nickname: user_id,
    station,
    train
  })
})

module.exports = router
