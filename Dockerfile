FROM node:18-slim

WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm install

RUN pnpm run build

CMD ["node", "./dist/server/entry.mjs"]