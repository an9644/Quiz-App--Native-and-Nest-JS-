import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './Modules/user/user.module';
import {AuthModule} from './Modules/auth/auth.module'
import {QuestionsModule} from './Modules/question/question.module'
import {ScoreModule} from './Modules/score//score.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Quiz_App'), 
    AuthModule,QuestionsModule,ScoreModule
  ],
})
export class AppModule {}
