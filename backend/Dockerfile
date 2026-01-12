FROM node:lts-alpine3.22

WORKDIR /src

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json pnpm*-lock.yaml ./

RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD [ "pnpm", "run", "dev" ]