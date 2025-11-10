import { ingredients } from '@mono/backend/tissi/drizzle';
import type { TissiDB } from '@mono/backend/tissi/drizzle';
import { NewIngredient } from '@mono/types/tissi';
import { Inject, Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';
import { TISSI_DB } from '../constants/tissi-tokens';

@Injectable()
export class IngredientsService {
  constructor(@Inject(TISSI_DB) private db: TissiDB) {}

  async create(newIngredients: NewIngredient[]) {
    const names = newIngredients.map((i) => i.name);
    await this.db
      .insert(ingredients)
      .values(newIngredients)
      .onConflictDoNothing();

    return await this.db
      .select()
      .from(ingredients)
      .where(inArray(ingredients.name, names));
  }

  async get() {
    return await this.db.select().from(ingredients);
  }
}
