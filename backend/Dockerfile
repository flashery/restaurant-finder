# ─── Stage 1: Build & compile ────────────────────────────────────────────────
FROM node:18 AS builder
WORKDIR /app

# Copy monorepo manifests
COPY package.json        pnpm-lock.yaml       pnpm-workspace.yaml ./
COPY tsconfig.json       ./

# Copy code
COPY shared/             shared/
COPY backend/            backend/

# Install & build
RUN npm install -g pnpm \
 && pnpm install \
 && pnpm --filter backend run build
#   → emits /app/backend/dist/

# ─── Stage 2: Runtime ───────────────────────────────────────────────────────
FROM node:18-slim
WORKDIR /app
ENV NODE_ENV=production

# 1) Install PNPM & PM2
RUN npm install -g pnpm pm2

# 2) Copy only the lockfile & backend manifest
COPY pnpm-lock.yaml       ./
COPY pnpm-workspace.yaml  ./
COPY backend/package.json ./package.json
COPY --from=builder /app/shared/data       ./dist/shared/data

# 3) Install only backend’s production deps
RUN pnpm install --prod --filter backend

# 4) Copy compiled code
COPY --from=builder /app/backend/dist ./dist

EXPOSE 4000

# 5) Run the server
CMD ["pm2-runtime", "dist/backend/src/server.js"]
