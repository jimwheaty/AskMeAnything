import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { Tag } from 'src/tags/tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Question, Tag])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
