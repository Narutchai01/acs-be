import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
