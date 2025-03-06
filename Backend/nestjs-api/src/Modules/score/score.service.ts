import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from './score.schema';

@Injectable()
export class ScoreService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async findByUsername(username: string): Promise<Score | null> {
    return this.scoreModel.findOne({ username }).exec();
  }

  async updateScore(username: string, topic: string, newScore: number): Promise<Score> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure the topic is valid
    if (!['geographical', 'technical', 'scientifical'].includes(topic)) {
      throw new Error('Invalid topic');
    }

    // Update only if new score is higher
    if (newScore > user[topic]) {
      user[topic] = newScore;
    }

    return user.save();
  }
  async getUsersWithScores() {
    return this.scoreModel.find(
      {
        $or: [
          { geographical: { $gt: 0 } },
          { technical: { $gt: 0 } },
          { scientifical: { $gt: 0 } }
        ]
      },
      { _id: 0, __v: 0 }
    );
  }

  async getUserScores(username: string) {
    const user = await this.scoreModel.findOne(
      { username },
      { _id: 0, __v: 0 } 
    );
  
    if (!user) {
      return null;
    }
  
    return user;
  }
  
}
