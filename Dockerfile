##### BUILDER

FROM node:18-slim as builder

WORKDIR /app

LABEL name=fast-dash
LABEL intermediate=true

COPY package.json .
COPY astro.config.mjs .
COPY src/ src/
COPY prisma/ prisma/
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY postcss.config.cjs .


RUN corepack enable

RUN pnpm install

RUN pnpm run build

##### RUNNER

FROM node:alpine

WORKDIR /app

LABEL name=fast-dash

COPY --from=builder /app/package.json .
COPY --from=builder /app/astro.config.mjs .
COPY --from=builder /app/prisma/ prisma/
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/postcss.config.cjs .
COPY --from=builder /app/dist/ dist/

RUN apk update && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@8.3.1 --activate 

CMD ["pnpm", "run", "prod:migrate"]