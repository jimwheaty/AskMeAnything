import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.model';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() newQuestion: Question) {
    return this.questionService.create(newQuestion);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateQuestion: Question) {
    return this.questionService.update(id, UpdateQuestion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
