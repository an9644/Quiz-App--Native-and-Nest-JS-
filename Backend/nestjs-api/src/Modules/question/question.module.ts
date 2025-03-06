import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './question.service';
import { QuestionsController } from './question.controller';
import { GeographicalQuestion, GeographicalQuestionSchema } from './schemas/geographical.schema';
import { TechnicalQuestion, TechnicalQuestionSchema } from './schemas/technical.schema';
import { ScientificalQuestion, ScientificalQuestionSchema } from './schemas/scientifical.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GeographicalQuestion.name, schema: GeographicalQuestionSchema },
      { name: TechnicalQuestion.name, schema: TechnicalQuestionSchema },
      { name: ScientificalQuestion.name, schema: ScientificalQuestionSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
