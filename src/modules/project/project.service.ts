import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProjectModel,
  ProjectModel,
  CreateProjectAssetModel,
  CreateProjectMemberModel,
} from 'src/models/project';
import { IProjectRepository } from 'src/repositories/project/project.abstract';
import { CreateProjectDto } from './dto/v1/create-project.dto';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { Pageable } from 'src/models';
import { QueryProjectDto } from './dto/v1/get-project.dto';
@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private supabase: SupabaseService,
  ) {}

  async createProject(
    data: CreateProjectDto,
    thumbnail: Express.Multer.File,
    assets: Express.Multer.File[],
    createdBy: number = 1,
    updatedBy: number = 1,
  ): Promise<ProjectModel> {
    const uploadThumbnail = await this.supabase.uploadFile(
      thumbnail,
      'projects/thumbnails',
    );

    const uploadAssets = await Promise.all(
      assets.map((asset) => this.supabase.uploadFile(asset, 'projects/assets')),
    );

    const projectData: CreateProjectModel = {
      title: data.title,
      thumbnail: uploadThumbnail,
      detail: data.detail,
      github: data.github || null,
      presentation: data.presentation || null,
      document: data.document || null,
      figma: data.figma || null,
      youtube: data.youtube || null,
      createdBy,
      updatedBy,
    };
    let project = await this.projectRepository.createProject(projectData);
    if (!project) {
      throw new HttpException(
        'create failed ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.createProjectAssets(project.id, uploadAssets, createdBy);

    await this.createProjectMember(data.members, project.id, createdBy);

    project = await this.getProjectById(project.id);

    if (!project) {
      throw new HttpException('Project not created', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async createProjectAssets(
    projectId: number,
    assets: string[],
    createdBy: number,
  ) {
    const data: CreateProjectAssetModel[] = assets.map((asset) => {
      return {
        projectId,
        asset,
        createdBy,
        updatedBy: createdBy,
      };
    });
    await this.projectRepository.createProjectAsset(data);
  }

  async getProjectById(id: number): Promise<ProjectModel> {
    const projectModel = await this.projectRepository.getProjectById(id);
    if (!projectModel) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return projectModel;
  }
  async getProjects(query: QueryProjectDto): Promise<Pageable<ProjectModel>> {
    const projectModels = await this.projectRepository.getProjects(query);

    return {
      rows: projectModels,
      totalRecords: projectModels.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }

  async createProjectMember(
    members: number[],
    projectId: number,
    createdBy: number,
  ): Promise<void> {
    const data: CreateProjectMemberModel[] = members.map((member) => {
      return {
        projectId,
        studentId: member,
        createdBy,
        updatedBy: createdBy,
      };
    });
    await this.projectRepository.createProjectMember(data);
  }
}
