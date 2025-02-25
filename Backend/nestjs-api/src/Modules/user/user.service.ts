import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'; 
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<UserDocument> { 
    const round = 10; 
    const hashedPassword = await bcrypt.hash(password, round); 

    return new this.userModel({ username, password: hashedPassword }).save();
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
