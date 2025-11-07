# Multi-stage Dockerfile: installs dependencies and (optionally) builds the app.
FROM node:20-alpine AS builder
WORKDIR /tissi

# Copy package manifests first for better layer caching
COPY package*.json ./

# Prefer reproducible install; fall back to install if no lockfile
RUN npm ci --prefer-offline --no-audit || npm install --no-audit

# Copy source and build if a build script exists (non-fatal)
COPY . .

ENV NX_DAEMON=false

RUN npx nx build tissi -c=production
RUN npx nx build tissi-api -c=production


# Final image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# install tini (small init) in the final image
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]


COPY --from=builder /tissi/dist/apps/tissi ./dist/apps/tissi
COPY --from=builder /tissi/dist/apps/tissi-api ./
COPY --from=builder /tissi/dist/libs/backend/tissi/drizzle/src/migrations ./libs/backend/tissi/drizzle/src/migrations

# Prefer reproducible install; fall back to install if no lockfile
RUN npm ci --prefer-offline --no-audit || npm install --no-audit

EXPOSE 3000

# Replace with your app's actual start command
CMD ["node", "main.js"]