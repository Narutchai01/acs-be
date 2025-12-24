import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/v1/create-project.dto';
import { success } from 'src/core/interceptors/response.helper';
import { QueryProjectDto } from './dto/v1/get-project.dto';
import { ProjectFactory } from './project.factory';

@Controller({
  path: 'projects',
  version: '1',
})
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectFactory: ProjectFactory,
  ) {}

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
    const assets = files.assets;
    if (!thumbnail) {
      return;
    }
    const projectData = await this.projectService.createProject(
      body,
      thumbnail,
      assets || [],
    );
    return success(projectData, HttpStatus.CREATED);
  }

  @Get()
  async getProjects(@Query() query: QueryProjectDto) {
    const project = await this.projectService.getProjects(query);

    return success(project, HttpStatus.OK);
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    const project = await this.projectService.getProjectById(id);
    const dto = this.projectFactory.mapProjectModelToProjectDto(project);
    return success(dto, HttpStatus.OK);
  }
}
