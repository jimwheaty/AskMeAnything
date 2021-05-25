import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/popular-tags')
  getPopularTags(@Query('limit') limit: string) {
    return this.statsService.getPopularTags(limit);
  }

  @Get('questions-by-date') 
  getQuestionsByDate(@Query('userId') userId: string, @Query('year') year: string, @Query('month') month: string) {
    return this.statsService.getQuestionsByDate(userId, year, month);
  }

  @Get('answers-by-date') 
  getAnswersByDate(@Query('userId') userId: string, @Query('year') year: string, @Query('month') month: string) {
    return this.statsService.getAnswersByDate(userId, year, month);
  }

}
