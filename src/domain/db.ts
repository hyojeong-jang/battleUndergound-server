import mongoose from 'mongoose';
import { User, UserModel } from '../models/User';

export class DB {
  constructor() {}
  read(query: any): mongoose.DocumentQuery<User[], User> {
    return UserModel.find(query);
  }

  create(user: User): Promise<User> {
    let u = new UserModel(user);
    return u.save();
  }

  // update(user: User): mongoose.Query<number> {
  //   return UserModel.update({ game_score: user.game_score }, {...user})
  // }
}