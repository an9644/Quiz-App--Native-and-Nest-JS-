import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import {Score } from '../score/score.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Score.name) private scoreModel: Model<Score>, 
  ) {}

  async signup(username: string, password: string) {
    const user = new this.userModel({ username, password });
    return user.save();
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    
    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found. Please sign up first.',
        redirectTo: '/Ver/signup' 
      });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const existingScore = await this.scoreModel.findOne({ username });
  
    if (!existingScore) {
      await new this.scoreModel({ username, scientific: 0, geographical: 0, technical: 0 }).save();
    }
  
    return { 
      message: 'Login successful', 
      username: user.username, 
      userType: user.userType 
    };
  }  

  async adminLogin(username: string, password: string) {
    const user = await this.userModel.findOne({ username, userType: 'admin' });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid admin credentials');
    }
  }
}