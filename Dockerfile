FROM node:24-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
RUN pnpm install --frozen-lockfile
RUN pnpm approve-builds better-sqlite3 &&pnpm rebuild better-sqlite3
COPY . .
EXPOSE 3001
CMD ["pnpm", "dev"]
