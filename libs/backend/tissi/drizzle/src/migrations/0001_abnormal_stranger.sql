CREATE TABLE "tissi"."ingredients" (
	"ingredient_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tissi"."recipe_ingredients" (
	"recipe_id" uuid,
	"ingredient_id" uuid,
	CONSTRAINT "recipe_ingredients_recipe_id_ingredient_id_pk" PRIMARY KEY("recipe_id","ingredient_id")
);
--> statement-breakpoint
CREATE TABLE "tissi"."list_ingredients" (
	"recipe_id" uuid,
	"ingredient_id" uuid,
	"checked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "list_ingredients_recipe_id_ingredient_id_pk" PRIMARY KEY("recipe_id","ingredient_id")
);
--> statement-breakpoint
ALTER TABLE "tissi"."recipes" ADD COLUMN "selected" boolean DEFAULT false NOT NULL;