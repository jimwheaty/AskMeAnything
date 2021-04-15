import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';

@Module({
  imports: [SequelizeModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
