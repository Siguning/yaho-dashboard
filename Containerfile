FROM node:24-alpine AS builder

WORKDIR /app

RUN mkdir -p /app/data

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="/app/data/sqlite.db"

RUN npx drizzle-kit generate

RUN npm run build

RUN npm prune --production

FROM node:24-alpine

WORKDIR /app

RUN mkdir -p /app/data

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build"]
