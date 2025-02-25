import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TechnicalQ {
    @Prop({required:true})
    question: string;

    @Prop({required:true})
    option1:string;

    @Prop({required:true})
    option2:string;

    @Prop({required:true})
    option3:string;

    @Prop({required:true})
    option4:string;

    @Prop({required:true})
    answer: string;
}

export type TechDocument = TechnicalQ & Document;
export const UserSchema = SchemaFactory.createForClass(TechnicalQ);