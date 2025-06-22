import { Request, UseGuards } from '@nestjs/common';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getAdmin(@Res() res: Response): Response {
    return res.status(200).json({
      message: 'Admin endpoint is working',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getAdminProfile(
    @Res() res: Response,
    @Request() req: AuthenticatedRequest,
  ): Promise<Response> {
    const admin = await this.adminService.getAdminById(req.user.userId);
    if (admin instanceof Error) {
      return res.status(404).json({
        message: admin.message,
      });
    }
    return res.status(200).json(admin);
  }
}
