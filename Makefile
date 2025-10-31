start-db:
	docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres

stop-db:
	docker stop drizzle-postgres && docker rm drizzle-postgres

tissi-generate-migration:
	npx drizzle-kit generate:migration --config libs/backend/tissi/drizzle/drizzle.config.ts