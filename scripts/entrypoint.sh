#!/bin/sh
set -e

# รอ DB ถ้าจำเป็น (ออปชัน) - ใส่ตัว wait-for เช่น nc หรือ wait-for-it ถ้าคุณต้องใช้
# nc -z $DATABASE_HOST $DATABASE_PORT -w 5 || echo "DB might not be ready yet"

# ใน production ควรใช้ migrate deploy
npx prisma migrate deploy

# seed ถ้าต้องการ (ทำให้เป็นออปชันด้วย ENV จะดี)
if [ "$RUN_SEED" = "true" ]; then
  echo "Seeding database..."
  npm run db:seed
fi

exec "$@"
