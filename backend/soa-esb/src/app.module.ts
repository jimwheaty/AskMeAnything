import { Module } from '@nestjs/common';
import { AnswerController } from './answer/answer.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [
    AnswerController,
    AuthController
  ],
})
export class AppModule {}
