import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from '../services/ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Get()
  getList() {
    return this.ingredientsService.get();
  }
}
