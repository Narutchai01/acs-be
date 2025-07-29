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
RUN adduser -S nextjs -u 1001

# Install dependencies
FROM base AS dependencies

WORKDIR /usr/src/app

# Set npm configuration for better compatibility and platform builds
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set unsafe-perm true

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

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm cache clean --force

# Install production dependencies with fallback for native modules and skip postinstall
RUN npm ci --production --no-audit --no-fund --verbose --omit=dev --ignore-scripts || \
    (npm config set python python3 && npm ci --production --no-audit --no-fund --verbose --omit=dev --ignore-scripts --build-from-source)

# Generate Prisma Client for production
RUN npx prisma generate

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/scripts ./scripts

# Change ownership to nodejs user
RUN chown -R nextjs:nodejs /usr/src/app
USER nextjs

# Make scripts executable
RUN chmod +x scripts/start-prod.sh

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "./scripts/start-prod.sh"]