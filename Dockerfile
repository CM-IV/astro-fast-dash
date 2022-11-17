########## BUILDER ##########

FROM node:18-slim as builder

WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm install

RUN pnpm run build

########## RUNNER ##########

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/server/entry.mjs"]