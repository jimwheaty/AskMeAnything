import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // create(@Body() newQuestion: Question, @Req() req) {
  //   newQuestion.userId = req.user.id;
  //   return this.questionService.create(newQuestion);
  // }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('per-user')
  findPerUser(@Query('userId') userId: number, @Query('limit') limit: string) {
    return this.questionService.findPerUser(userId, limit);
  }

  @Get('per-tag')
  findPerTag(@Query('tag') tag: string, @Query('limit') limit: string) {
    return this.questionService.findPerTag(tag, limit);
  }

  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestion: Question) {
    return this.questionService.update(id, updateQuestion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
