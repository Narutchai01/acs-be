import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/v1/create-project.dto';
import { success } from 'src/core/interceptors/response.helper';

@Controller({
  path: 'projects',
  version: '1',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'assets', maxCount: 10 },
    ]),
  )
  async createProject(
    @Body() body: CreateProjectDto,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      assets?: Express.Multer.File[];
    },
  ) {
    const thumbnail = files.thumbnail?.[0];
    if (!thumbnail) {
      return;
    }

    const projectData = await this.projectService.createProject(
      body,
      thumbnail,
    );
    return success(projectData, HttpStatus.CREATED);
  }
}
