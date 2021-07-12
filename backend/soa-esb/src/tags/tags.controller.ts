import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Tag } from './tags.model';

@Controller('tags')
export class TagsController {
//   constructor(private readonly tagsService: TagsService) {}

//   @Post()
//   create(@Body() newTag: Tag) {
//     return this.tagsService.create(newTag);
//   }

//   @Get()
//   findAll() {
//     return this.tagsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.tagsService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: number, @Body() updateTag: Tag) {
//     return this.tagsService.update(id, updateTag);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number) {
//     return this.tagsService.remove(id);
//   }
}
