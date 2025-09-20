# syntax=docker/dockerfile:1.7
FROM node:24.5.0-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /usr/src/app

# ---------- deps ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts

# ---------- build ----------
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json nest-cli.json package.json ./
COPY src ./src

# generate Prisma Client ตอน build (ใช้ CLI จาก devDeps ใน image นี้ได้ เพราะเรายังไม่ได้ omit)
RUN npx prisma generate
RUN npm run prebuild || true
RUN npm run build

# ---------- prod-deps ----------
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --ignore-scripts

# ---------- production ----------
FROM base AS production
ENV NODE_ENV=production

# อย่า root
USER node

# คัดลอก lib/ไบนารี + client ที่ generate แล้วจาก builder
COPY --chown=node:node --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder   /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --chown=node:node --from=builder   /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --chown=node:node --from=builder   /usr/src/app/dist                ./dist
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node package.json ./

# ❌ ไม่ต้อง run `npx prisma generate` ที่นี่อีกแล้ว
COPY --chown=node:node ./scripts /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# ตรวจว่าทางออก Nest ตรงไหม: ปกติคือ dist/main.js ไม่ใช่ dist/src/main
CMD ["node", "dist/src/main.js"]
