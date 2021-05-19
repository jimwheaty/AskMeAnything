import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/popular-tags')
  getPopularTags(@Query('limit') limit: string) {
    return this.statsService.getPopularTags(limit);
  }

  // // statistics of question with tags
  // getNumberOfTags()

  // get

  // @Get('popular-tags/questions')
  // getPopularQuestionsPerTag('limit')
}
