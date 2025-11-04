CREATE TABLE "tissi"."list_ingredients_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid,
	"ingredient_id" uuid,
	"unit" text NOT NULL,
	"quantity" numeric NOT NULL,
	CONSTRAINT "list_ingredients_units_recipe_id_ingredient_id_unique" UNIQUE("recipe_id","ingredient_id")
);
--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients" DROP CONSTRAINT "list_ingredients_recipe_id_ingredient_id_pk";--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients" ADD PRIMARY KEY ("ingredient_id");--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients" ALTER COLUMN "ingredient_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients_units" ADD CONSTRAINT "list_ingredients_units_recipe_id_recipes_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "tissi"."recipes"("recipe_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients_units" ADD CONSTRAINT "list_ingredients_units_ingredient_id_ingredients_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "tissi"."ingredients"("ingredient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients" ADD CONSTRAINT "list_ingredients_ingredient_id_ingredients_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "tissi"."ingredients"("ingredient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tissi"."list_ingredients" DROP COLUMN "recipe_id";