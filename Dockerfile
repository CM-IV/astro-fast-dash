##### BUILDER

FROM node:18-slim as builder

WORKDIR /app

LABEL name=fast-dash
LABEL intermediate=true

COPY package.json .
COPY .env .
COPY astro.config.mjs .
COPY src/ src/
COPY prisma/ prisma/
COPY pnpm-lock.yaml .
COPY tsconfig.json .

RUN corepack enable

RUN pnpm install

RUN pnpm run build

##### RUNNER

FROM node:alpine

WORKDIR /app

LABEL name=fast-dash

COPY --from=builder /app/ .

RUN apk update && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@7.15.0 --activate 

CMD ["pnpm", "run", "prod:migrate"]