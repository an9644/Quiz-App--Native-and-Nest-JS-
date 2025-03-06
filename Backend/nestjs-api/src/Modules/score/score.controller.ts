import { Controller, Patch, Param, Body, NotFoundException,Get } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Patch('update/:username/:topic')
  async updateScore(
    @Param('username') username: string,
    @Param('topic') topic: string,
    @Body('score') score: number
  ) {
    const updatedUser = await this.scoreService.updateScore(username, topic, score);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Score updated successfully', updatedUser };
  }

  @Get('all')
  async getAllUsersWithScores() {
    return this.scoreService.getUsersWithScores();
  }

  @Get(':username')
  async getUserScore(@Param('username') username: string) {
    const userScores = await this.scoreService.getUserScores(username);

    if (!userScores) {
      throw new NotFoundException('User not found or no scores available');
    }

    return userScores;
  }
}
