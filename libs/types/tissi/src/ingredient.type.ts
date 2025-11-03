import { ingredients } from '@mono/backend/tissi/drizzle';

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
