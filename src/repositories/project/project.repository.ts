import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProjectRepository } from './project.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProjectFactory } from './project.factory';
import {
  CreateProjectModel,
  ProjectModel,
  CreateProjectAssetModel,
} from 'src/models/project';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    private prisma: PrismaService,
    private projectFactory: ProjectFactory,
  ) {}

  async createProject(data: CreateProjectModel): Promise<ProjectModel> {
    const project = await this.prisma.project.create({
      data,
      include: {
        ProjectAsset: true,
      },
    });
    return this.projectFactory.mapProjectEntityToProjectModel(project);
  }

  async createProjectAsset(data: CreateProjectAssetModel[]): Promise<void> {
    await this.prisma.projectAsset.createMany({ data });
  }

  async getProjects(): Promise<ProjectModel[]> {
    const projectEntities = await this.prisma.project.findMany({
      include: {
        ProjectAsset: true,
      },
    });

    return this.projectFactory.mapProjectEntitiesToProjectModels(
      projectEntities,
    );
  }

  async getProjectById(id: number): Promise<ProjectModel> {
    const projectEntity = await this.prisma.project.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        ProjectAsset: true,
      },
    });

    if (!projectEntity) {
      throw new HttpException(
        `Project with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.projectFactory.mapProjectEntityToProjectModel(projectEntity);
  }
}
