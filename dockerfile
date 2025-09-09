# syntax=docker/dockerfile:1.7
FROM node:24.5.0-alpine AS base

# Prisma on Alpine needs these
RUN apk add --no-cache libc6-compat openssl

WORKDIR /usr/src/app

# ---------- deps: ติดตั้ง dependencies แบบ clean ----------
FROM base AS deps
# ใช้ lockfile เพื่อ build ที่ repeatable
COPY package.json package-lock.json ./
# ใช้ cache mount เร่งความเร็ว (ต้องใช้ BuildKit)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

# ---------- build: สร้าง NestJS dist ----------
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
# ต้องมีโฟลเดอร์ prisma สำหรับ generate และ build
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
COPY package.json ./

# Prisma generate หลังมี node_modules แล้ว
RUN npx prisma generate

# build (prebuild ถ้ามี script ก็โอเค)
RUN npm run prebuild || true
RUN npm run build

FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
# ถ้าต้อง generate client เวลา dev
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# ---------- prod-deps: เอาเฉพาะ dependencies ที่ใช้จริงใน prod ----------
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

# ---------- production: บาง เบา ----------
FROM base AS production
ENV NODE_ENV=production
# สร้าง user ปลอดภัย (node มีอยู่แล้วใน image) หรือใช้ user node
USER node

# คัดลอกเฉพาะที่ต้องใช้รันจริง
COPY --chown=node:node --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder   /usr/src/app/dist        ./dist
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node package.json ./

# (ถ้า seed ต้องอ่านไฟล์ใน prisma/ หรือ script อื่น ให้คัดลอกมาด้วยแล้วระบุใน package.json)

# แนะนำให้ migrate ใน prod (แทน db push)
# สร้าง entrypoint เล็กๆ สำหรับ migrate + seed แล้ว start
# จะถูกคัดลอกจากด้านล่าง (ดูบล็อกไฟล์)
COPY --chown=node:node ./scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "dist/main"]





