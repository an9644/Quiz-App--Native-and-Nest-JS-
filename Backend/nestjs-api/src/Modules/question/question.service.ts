import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeographicalQuestion, GeographicalQuestionDocument } from './schemas/geographical.schema';
import { TechnicalQuestion, TechnicalQuestionDocument } from './schemas/technical.schema';
import { ScientificalQuestion, ScientificalQuestionDocument } from './schemas/scientifical.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(GeographicalQuestion.name) private geoModel: Model<GeographicalQuestionDocument>,
    @InjectModel(TechnicalQuestion.name) private techModel: Model<TechnicalQuestionDocument>,
    @InjectModel(ScientificalQuestion.name) private sciModel: Model<ScientificalQuestionDocument>,
  ) {}

  // Create Question
  async createQuestion(category: string, questionData: any) {
    if (category === 'geographical') {
      return new this.geoModel(questionData).save();
    } else if (category === 'technical') {
      return new this.techModel(questionData).save();
    } else if (category === 'scientifical') {
      return new this.sciModel(questionData).save();
    }
  }

  // Get All Questions by Category
  async findByCategory(category: string) {
    if (category === 'geographical') {
      return this.geoModel.find().exec();
    } else if (category === 'technical') {
      return this.techModel.find().exec();
    } else if (category === 'scientifical') {
      return this.sciModel.find().exec();
    }
  }

  // Update Question
  async update(category: string, id: string, updatedData: any) {
    const model = category === 'geographical' ? this.geoModel :
                  category === 'technical' ? this.techModel :
                  this.sciModel;
    return model.findByIdAndUpdate(id, updatedData, { new: true }).exec();
  }

  // Delete Question
  async delete(category: string, id: string) {
    const model = category === 'geographical' ? this.geoModel :
                  category === 'technical' ? this.techModel :
                  this.sciModel;
    return model.findByIdAndDelete(id).exec();
  }
}
