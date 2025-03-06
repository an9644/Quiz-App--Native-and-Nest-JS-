import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechnicalQuestionDocument = TechnicalQuestion & Document;

@Schema()
export class TechnicalQuestion {
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

export const TechnicalQuestionSchema = SchemaFactory.createForClass(TechnicalQuestion);
