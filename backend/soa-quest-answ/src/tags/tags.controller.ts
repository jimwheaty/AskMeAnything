import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @MessagePattern({ role: 'stats', cmd: 'tags' })
  getPopularTags(@Payload('limit') limit) {
    return this.tagsService.getPopularTags(limit);
  }

  @Post()
  create(@Body() newTag: Tag) {
    return this.tagsService.create(newTag);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTag: Tag) {
    return this.tagsService.update(id, updateTag);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagsService.remove(id);
  }
}
