start-db:
	docker compose -f compose.yaml up -d

stop-db:
	docker compose -f compose.yaml down

tissi-generate-migration:
	npx drizzle-kit generate --config libs/backend/tissi/drizzle/drizzle.config.ts

tissi-drop-migration:
	npx drizzle-kit drop --config libs/backend/tissi/drizzle/drizzle.config.ts

tissi-migrate:
	npx drizzle-kit migrate --config libs/backend/tissi/drizzle/drizzle.config.ts

auth-generate-migration:
	npx @better-auth/cli@latest generate --config libs/backend/auth/drizzle/auth.ts --output libs/backend/auth/drizzle/src/schemas/index.ts
	npx drizzle-kit generate --config libs/backend/auth/drizzle/drizzle.config.ts