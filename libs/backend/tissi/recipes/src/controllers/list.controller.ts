import { Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from '../services/list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  getList() {
    return this.listService.get();
  }

  @Post('/check/:id')
  check(@Param('id') id: string) {
    return this.listService.check(id);
  }

  @Post('/uncheck/:id')
  uncheck(@Param('id') id: string) {
    return this.listService.uncheck(id);
  }
}
