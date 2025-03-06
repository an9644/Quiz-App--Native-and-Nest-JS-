import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Score extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: 0 })
  geographical: number;

  @Prop({ default: 0 })
  technical: number;

  @Prop({ default: 0 })
  scientifical: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
