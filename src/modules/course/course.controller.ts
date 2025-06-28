import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends ExpressRequest {
    user: {
        userId: number;
        roleId: number;
    };
}

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCourse(
        @Body() body: CreateCourseDto,
        @Request() req: AuthenticatedRequest,
    ) {
        const result = await this.courseService.createCourse(body, req.user.userId);

        return result;
    }
}
