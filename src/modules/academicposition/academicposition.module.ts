import { Module } from '@nestjs/common';
import { AcademicPositionService } from './academicposition.service';
import { AcademicPositionController } from './academicposition.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { AcademicPositionFactory } from './academicposition.factory';

@Module({
  imports: [RepositoriesModule],
  controllers: [AcademicPositionController],
  providers: [AcademicPositionService, AcademicPositionFactory],
})
export class AcademicPositionModule {}
