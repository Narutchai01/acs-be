import { Module } from '@nestjs/common';
import { EducationlevelService } from './educationlevel.service';
import { EducationlevelController } from './educationlevel.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { EducationLevelFactory } from './educationlevel.factory';

@Module({
  imports: [RepositoriesModule],
  controllers: [EducationlevelController],
  providers: [EducationlevelService, EducationLevelFactory],
})
export class EducationlevelModule {}
