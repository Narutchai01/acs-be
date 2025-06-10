import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getList() {
    try {
      return await this.roleService.getList();
    } catch (error) {
      return {
        msg:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  }

  @Get(':name')
  async getByName(@Param('name') name: string) {
    try {
      return await this.roleService.getByName(name);
    } catch (error) {
      return {
        msg:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  }
}
