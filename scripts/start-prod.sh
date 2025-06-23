#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
until npx prisma db push --accept-data-loss 2>/dev/null; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready - starting application in production mode"
npm run start:prod
