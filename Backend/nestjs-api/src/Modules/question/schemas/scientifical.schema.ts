import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScientificalQuestionDocument = ScientificalQuestion & Document;

@Schema()
export class ScientificalQuestion {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  option1: string;
  @Prop({ required: true })
  option2: string;
  @Prop({ required: true })
  option3: string;
  @Prop({ required: true })
  option4: string;

  @Prop({ required: true })
  answer: string;
}

export const ScientificalQuestionSchema = SchemaFactory.createForClass(ScientificalQuestion);
