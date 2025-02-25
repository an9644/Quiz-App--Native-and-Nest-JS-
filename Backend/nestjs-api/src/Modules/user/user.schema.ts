import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user'}) 
  usertype: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
