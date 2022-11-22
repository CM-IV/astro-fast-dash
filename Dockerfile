##### BUILDER

FROM node:lts as builder

WORKDIR /app

LABEL name=fast-dash
LABEL intermediate=true

RUN git clone -b postgres https://github.com/CM-IV/astro-fast-dash.git

RUN cp -r /app/astro-fast-dash/* .

RUN rm -rf /app/astro-fast-dash

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
COPY --from=builder /app/dist/ dist/

RUN apk update && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@7.15.0 --activate 

CMD ["pnpm", "run", "prod:migrate"]