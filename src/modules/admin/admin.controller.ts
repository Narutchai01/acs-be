import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  @Get()
  getAdmin(@Res() res: Response): Response {
    return res.status(200).json({
      message: 'Admin endpoint is working',
    });
  }
}
