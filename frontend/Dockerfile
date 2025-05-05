FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm --filter frontend run build

FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
