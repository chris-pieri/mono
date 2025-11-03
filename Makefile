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
