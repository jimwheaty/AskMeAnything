import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.model';
import { AuthGuard } from '@nestjs/passport';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // create(@Body() newAnswer: Answer, @Request() req) {
  //   newAnswer.userId = req.user.id;
  //   return this.answerService.create(newAnswer);
  // }

  @MessagePattern('findAll')
  findAll() {
    return this.answerService.findAll();
  }

  @MessagePattern('findPerUser')
  findPerUser(@Payload('userId') userId: number, @Payload('limit') limit: string) {
    return this.answerService.findPerUser(userId, limit);
  }

  @MessagePattern('findPerQuestion')
  findPerQuestion(@Payload('questionId') questionId: number) {
    return this.answerService.findPerQuestion(questionId);
  }

  @MessagePattern('findOne')
  findOne(@Payload('id') id: number) {
    return this.answerService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateAnswer: Answer) {
  //   return this.answerService.update(id, updateAnswer);
  // }

  @MessagePattern('remove')
  remove(@Payload('id') id: number) {
    return this.answerService.remove(id);
  }
}
