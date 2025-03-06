import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
