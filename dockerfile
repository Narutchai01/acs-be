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

# Copy files first as root to ensure proper setup
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder   /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder   /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder   /usr/src/app/dist                ./dist
COPY prisma ./prisma
COPY package.json ./
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
COPY ./scripts /usr/local/bin/

# Set proper permissions and ownership for the node user
RUN chown -R node:node /usr/src/app && \
    chmod +x /usr/local/bin/entrypoint.sh

# Switch to node user after setting up permissions
USER node

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["npm", "run", "start:dev"]

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
