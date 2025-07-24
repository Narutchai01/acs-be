FROM node:20.10.0-alpine AS base

# Install openssl for Prisma and build dependencies for native modules
RUN apk add --no-cache openssl libc6-compat python3 make g++

# Install dependencies
FROM base AS development

WORKDIR /usr/src/app

# Set npm configuration for better compatibility and platform builds
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
COPY prisma ./prisma/

# Clear npm cache and install with more robust settings
RUN npm cache clean --force
RUN npm install --no-audit --no-fund --verbose

# Generate Prisma Client for the container architecture
RUN npx prisma generate

COPY . ./

RUN npm run prebuild && npm run build

# Make scripts executable (if you have the script)
# RUN chmod +x scripts/start.sh

# CMD ["./scripts/start.sh"]

CMD ["sh", "-c", "npx prisma db push && npm run db:seed && npm run start"]

# Production image
FROM base AS production

WORKDIR /usr/src/app

# Set npm configuration for better compatibility
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
COPY prisma ./prisma/

# Clear npm cache and install production dependencies
RUN npm cache clean --force
RUN npm ci --production --verbose

# Generate Prisma Client for production
RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/scripts ./scripts

# Make scripts executable
RUN chmod +x scripts/start-prod.sh

CMD ["sh", "./scripts/start-prod.sh"]