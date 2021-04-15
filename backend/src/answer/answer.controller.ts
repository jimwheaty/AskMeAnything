import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.model';


@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() newAnswer: Answer) {
    return this.answerService.create(newAnswer);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnswer: Answer) {
    return this.answerService.update(id, updateAnswer);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }
}
