FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm serve

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]