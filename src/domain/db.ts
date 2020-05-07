import mongoose from 'mongoose';
import { User, UserModel } from '../models/User';

export class DB {
  constructor() {}
  read(): mongoose.DocumentQuery<User[], User> {
    return UserModel.find().sort({ game_score: -1 }).limit(10);
  }

  create(user: User): Promise<User> {
    let userModel = new UserModel(user);
    return userModel.save();
  }

  updateNickname(id: string, nickname: string) {
    return UserModel.findByIdAndUpdate(id, { nickname }, { new: true });
  }

  updateGameScore(id: string, gameScore: number) {
    return UserModel.findByIdAndUpdate(id, { game_score: gameScore });
  }
}
