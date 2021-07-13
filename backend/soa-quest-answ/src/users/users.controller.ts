import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({role: 'user', cmd: 'get'})
  findByUsername(data) {
     return this.usersService.findByUsername(data.username);
  } 
  
  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post('users')
  createUser(@Body() newUser: User) {
    return this.usersService.create(newUser);
  }

  @Patch('users/:id')
  update(@Param('id') id: number, @Body() updateUser: User) {
    return this.usersService.update(id, updateUser);
  }

  @Delete('users/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
   
}




