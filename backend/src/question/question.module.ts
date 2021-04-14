import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
