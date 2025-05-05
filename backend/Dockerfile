# === Stage 1: Build ===
FROM node:18 AS builder

WORKDIR /app

# Copy everything needed
COPY . .

# Install deps & build
RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm --filter backend run build

# === Stage 2: Runtime ===
FROM node:18-slim

WORKDIR /app

ENV NODE_ENV=production

# Install only runtime dependencies
RUN npm install -g pnpm pm2

# Copy compiled app and only necessary files
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/shared ./shared

EXPOSE 4000

CMD ["pm2-runtime", "dist/server.js"]
