import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Answer } from './answer.model';
import { AuthGuard } from '@nestjs/passport';


@Controller('answers')
export class AnswerController {
  private answerClient: ClientProxy;

  constructor() {

    const connectionOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      }
    };

    this.answerClient = ClientProxyFactory.create(connectionOptions);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // create(@Body() newAnswer: Answer, @Request() req) {
  //   newAnswer.userId = req.user.id;
  //   const payload = { newAnswer };
  //   return this.answerClient.send<any,any>('create', payload);
  // }

  @Get()
  findAll() {
    return this.answerClient.send<any,any>('findAll', {});
  }

  @Get('per-user')
  findPerUser(@Query('userId') userId: number, @Query('limit') limit: string) {
    const payload = { userId, limit };
    return this.answerClient.send<any,any>('findPerUser', payload);
  }

  @Get('per-question')
  findPerQuestion(@Query('questionId') questionId: number) {
    const payload = { questionId };
    return this.answerClient.send<any,any>('findPerQuestion', payload);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const payload = { id };
    return this.answerClient.send<any,any>('findOne', payload);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateAnswer: Answer) {
  //   return this.answerService.update(id, updateAnswer);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const payload = { id };
    return this.answerClient.send<any,any>('remove', payload);
  }
}
