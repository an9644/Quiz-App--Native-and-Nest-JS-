import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TechnicalQ, TechDocument } from './technical.schema';



@Injectable()
export class TechService {
    constructor(@InjectModel(TechnicalQ.name) private userModel: Model<TechDocument>) {}

    async createqestion(
        question: string,
        option1:string,
        option2:string,
        option3:string,
        option4:string,
        answer: string,
    ){
       return new this.userModel({question,option1,option2,option3,option4,answer}).save()
    }

    async getquestion():Promise<TechDocument[]>{
        return this.userModel.find().exec();
    }
}