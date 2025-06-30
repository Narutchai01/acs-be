FROM node:20.10.0-alpine AS base

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Install dependencies
FROM base AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --no-audit --no-fund

# Generate Prisma Client for the container architecture
RUN npx prisma generate

COPY . ./

RUN npm run prebuild && npm run build

# Make scripts executable
# RUN chmod +x scripts/start.sh

# CMD ["./scripts/start.sh"]

CMD ["sh", "-c", "npx prisma db push && npm run db:seed && npm run start"]

# Production image
FROM base AS production

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --production

# Generate Prisma Client for production
RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/scripts ./scripts

# Make scripts executable
RUN chmod +x scripts/start-prod.sh

CMD ["./scripts/start-prod.sh"]