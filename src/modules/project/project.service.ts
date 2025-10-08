import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProjectModel,
  ProjectModel,
  CreateProjectAssetModel,
} from 'src/models/project';
import { IProjectRepository } from 'src/repositories/project/project.abstract';
import { CreateProjectDto } from './dto/v1/create-project.dto';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { Pageable } from 'src/models';

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
  async getProjects(): Promise<Pageable<ProjectModel>> {
    const projectModels = await this.projectRepository.getProjects();
    return {
      rows: projectModels,
      totalRecords: projectModels.length,
      page: 1,
      pageSize: 10,
    };
  }
}
