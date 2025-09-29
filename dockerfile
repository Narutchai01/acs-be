# syntax=docker/dockerfile:1.7
FROM node:24.5.0-alpine AS base
RUN apk add --no-cache libc6-compat openssl curl ca-certificates
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

#---------dev-deps----------
FROM base AS dev-deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts
RUN npm install -g ts-node typescript @nestjs/cli
# ---------- development ----------
FROM base AS development
ENV NODE_ENV=development
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder   /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder   /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder   /usr/src/app/dist ./dist
COPY prisma ./prisma
COPY package.json ./
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
COPY ./scripts /usr/local/bin/

# ป้องกัน CRLF และตั้งสิทธิ์ก่อนสลับ USER
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh \
    && chown -R node:node /usr/src/app

USER node
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start:dev"]

# ---------- production ----------
FROM base AS production
ENV NODE_ENV=production
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder   /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder   /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder   /usr/src/app/dist ./dist
COPY prisma ./prisma
COPY package.json ./
COPY ./scripts /usr/local/bin/

# จัดการ CRLF + สิทธิ์ก่อนสลับ USER
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

USER node
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "dist/src/main.js"]