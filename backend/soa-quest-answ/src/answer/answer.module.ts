import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { Question } from 'src/question/question.model';

@Module({
  imports: [SequelizeModule.forFeature([Answer, Question])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
