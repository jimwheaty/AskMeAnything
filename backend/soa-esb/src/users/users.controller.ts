import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Post()
  // createUser(@Body() newUser: User) {
  //   return this.usersService.create(newUser);
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateUser: User) {
  //   return this.usersService.update(id, updateUser);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.usersService.remove(id);
  // }
   
}




