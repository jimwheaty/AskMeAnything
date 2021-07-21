import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, ExecutionContext, Req } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.model';
import { ClientAuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';


@Controller('answers')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    private readonly jwtService: JwtService 
    ) {}

  @UseGuards(ClientAuthGuard)
  @Post()
  async create(@Body() newAnswer: Answer, @Req() req) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    // const userId = await this.answerService.getUserFromJWT(accessToken).pipe().toPromise();
    const userId = this.jwtService.decode(accessToken).sub;
    newAnswer.userId = userId;
    return await this.answerService.create(newAnswer);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get('per-user')
  findPerUser(@Query('userId') userId: number, @Query('limit') limit: string) {
    return this.answerService.findPerUser(userId, limit);
  }

  @Get('per-question')
  findPerQuestion(@Query('questionId') questionId: number) {
    return this.answerService.findPerQuestion(questionId);
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
