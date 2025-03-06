import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  option1: string;

  @IsNotEmpty()
  @IsString()
  option2: string;

  @IsNotEmpty()
  @IsString()
  option3: string;

  @IsNotEmpty()
  @IsString()
  option4: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}

