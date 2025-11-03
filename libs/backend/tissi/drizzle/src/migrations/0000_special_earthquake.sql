CREATE SCHEMA "tissi";
--> statement-breakpoint
CREATE TABLE "tissi"."recipes" (
	"recipe_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
