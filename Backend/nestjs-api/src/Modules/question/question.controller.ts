import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuestionsService } from './question.service';
import {CreateQuestionDto}  from './dto/question.dto'
import { UpdateQuestionDto } from './dto/update.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(":category")
async addQuestion(
  @Param("category") category: string,
  @Body() questionData: CreateQuestionDto
) {
  return this.questionsService.createQuestion(category, questionData);
}


  @Get(':category')
  async getQuestionsByCategory(@Param('category') category: string) {
    return this.questionsService.findByCategory(category);
  }

  @Put(':category/:id')
async updateQuestion(
  @Param('category') category: string,
  @Param('id') id: string,
  @Body() updatedData: UpdateQuestionDto
) {
  return this.questionsService.update(category, id, updatedData);
}

  @Delete(':category/:id')
  async deleteQuestion(@Param('category') category: string, @Param('id') id: string) {
    return this.questionsService.delete(category, id);
  }
}
