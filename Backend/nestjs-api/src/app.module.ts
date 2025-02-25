import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Quiz_App', {
      directConnection: true,
    }),
    UserModule, 
  ],
})
export class AppModule {}
