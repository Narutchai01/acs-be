import { Injectable } from '@nestjs/common';
import { IProjectRepository } from './project.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProjectFactory } from './project.factory';
import { CreateProjectModel, ProjectModel } from 'src/models/project';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    private prisma: PrismaService,
    private projectFactory: ProjectFactory,
  ) {}

  async createProject(data: CreateProjectModel): Promise<ProjectModel> {
    const project = await this.prisma.project.create({ data });
    return this.projectFactory.mapProjectEntityToProjectModel(project);
  }
}
