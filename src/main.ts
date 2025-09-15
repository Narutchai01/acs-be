import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { AllExceptionsFilter } from './core/exception/exception.filter';
import { PrismaClient } from '@prisma/client';
import { executeRole } from '../prisma/seed/role';
import { executeListType, executeType } from '../prisma/seed/type';
import { executeTypeCourse } from '../prisma/seed/course';
import { executeAcademicPosition } from '../prisma/seed/academicposition';
import { executeeducationLevelSeed } from '../prisma/seed/education-level';
import { executeMajorPosition } from '../prisma/seed/majorposition';
import { execSync } from 'child_process';

async function runSeeds() {
  const prisma = new PrismaClient();

  try {
    console.log('🚀 Checking database connection...');

    // Check if we can connect to the database
    await prisma.$connect();

    console.log('🔧 Running database migrations...');

    // Apply pending migrations
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    console.log('🌱 Starting database seeding...');

    await executeRole(prisma);
    await executeType(prisma);
    await executeListType(prisma);
    await executeTypeCourse(prisma);
    await executeAcademicPosition(prisma);
    await executeeducationLevelSeed(prisma);
    await executeMajorPosition(prisma);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during database setup/seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Run database seeds on startup
  await runSeeds();

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
