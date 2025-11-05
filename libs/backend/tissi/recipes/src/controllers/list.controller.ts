import {
  Controller,
  Get,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { ListService } from '../services/list.service';
import { map, Observable } from 'rxjs';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  getList() {
    return this.listService.get();
  }

  @Post('/check/:id')
  check(@Param('id') id: string) {
    this.listService.check(id);
  }

  @Post('/uncheck/:id')
  uncheck(@Param('id') id: string) {
    this.listService.uncheck(id);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.listService.reloadListEvent
      .asObservable()
      .pipe(map((_) => ({ data: 'RELOAD_LIST' })));
  }
}
