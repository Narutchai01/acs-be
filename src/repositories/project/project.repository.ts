import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProjectRepository } from './project.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProjectFactory } from './project.factory';
import {
  CreateProjectModel,
  ProjectModel,
  CreateProjectAssetModel,
  CreateProjectMemberModel,
  CreateProjectCategoryModel,
  CreateProjectFieldModel,
} from 'src/models/project';
import { QueryProjectDto } from 'src/modules/project/dto/v1/get-project.dto';
import calculatePagination from 'src/core/utils/calculatePagination';
import { ProjectEntity } from 'src/entities/project.entity';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    private prisma: PrismaService,
    private projectFactory: ProjectFactory,
  ) {}

  async createProject(data: CreateProjectModel): Promise<ProjectModel> {
    const project = await this.prisma.project.create({
      data,
    });
    return this.projectFactory.mapProjectEntityToProjectModel(
      project as ProjectEntity,
    );
  }

  async createProjectAsset(data: CreateProjectAssetModel[]): Promise<void> {
    await this.prisma.projectAsset.createMany({ data });
  }

  async getProjects(query: QueryProjectDto): Promise<ProjectModel[]> {
    const { page, pageSize, sortBy = 'createdAt', sortOrder } = query;
    const projectEntities = await this.prisma.project.findMany({
      where: { deletedAt: null },
      take: pageSize,
      ...(pageSize && { take: pageSize }),
      ...(page && pageSize && { skip: calculatePagination(page, pageSize) }),
      ...(sortBy && { orderBy: { [sortBy]: sortOrder || 'desc' } }),
      include: {
        ProjectAsset: true,
        ProjectMember: { include: { student: true } },
      },
    });

    return this.projectFactory.mapProjectEntitiesToProjectModels(
      projectEntities as ProjectEntity[],
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
        ProjectMember: { include: { student: { include: { user: true } } } },
        ProjectCategories: { include: { listType: true } },
        ProjectFields: { include: { listType: true } },
      },
    });

    if (!projectEntity) {
      throw new HttpException(
        `Project with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.projectFactory.mapProjectEntityToProjectModel(
      projectEntity as ProjectEntity,
    );
  }

  async createProjectMember(data: CreateProjectMemberModel[]): Promise<void> {
    await this.prisma.projectMember.createMany({ data });
  }

  async createProjectCategory(
    data: CreateProjectCategoryModel[],
  ): Promise<void> {
    await this.prisma.projectCategory.createMany({ data });
  }

  async createProjectField(data: CreateProjectFieldModel[]): Promise<void> {
    await this.prisma.projectFields.createMany({ data });
  }
}
