import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from 'src/question/question.model';
import { Tag } from 'src/tags/tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Question, Tag])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
