FROM node:20.10.0-alpine AS base

# Install openssl for Prisma and build dependencies for native modules
RUN apk add --no-cache \
    openssl \
    libc6-compat \
    python3 \
    make \
    g++ \
    git \
    dumb-init

# Create app directory and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001 -G nodejs

# Install dependencies
FROM base AS dependencies

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Clear npm cache and install all dependencies (including dev for build)
RUN npm cache clean --force

# Install dependencies with fallback for native modules and skip postinstall
RUN npm ci --no-audit --no-fund --verbose --ignore-scripts || \
    (npm config set python python3 && npm ci --no-audit --no-fund --verbose --ignore-scripts --build-from-source)

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client for the container architecture
RUN npx prisma generate

# Development stage
FROM dependencies AS development

WORKDIR /usr/src/app

# Copy source code
COPY . ./

# Build the application
RUN npm run prebuild && npm run build

# Make scripts executable (if you have the script)
# RUN chmod +x scripts/start.sh

# CMD ["./scripts/start.sh"]

CMD ["sh", "-c", "npx prisma db push && npm run db:seed && npm run start"]

# Production image
FROM base AS production

WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/prisma ./prisma/

# Install production dependencies
RUN npm ci --production --no-audit --no-fund

# Generate Prisma Client for production
RUN npx prisma generate

# Copy built application
COPY --from=development /usr/src/app/dist ./dist/
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma/

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

CMD ["sh", "-c", "npx prisma db push && npm run db:seed && npm run start:prod"]

