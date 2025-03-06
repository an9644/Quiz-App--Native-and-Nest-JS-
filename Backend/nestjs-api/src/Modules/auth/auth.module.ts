import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './user.schema';
import { ScoreModule } from '../score/score.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ScoreModule
  ],
  controllers: [AuthController],
  providers: [AuthService, 
],
})
export class AuthModule {}