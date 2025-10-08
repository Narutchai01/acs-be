import { Injectable } from '@nestjs/common';
import { CreateProjectModel, ProjectModel } from 'src/models/project';
import { IProjectRepository } from 'src/repositories/project/project.abstract';
import { CreateProjectDto } from './dto/v1/create-project.dto';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private supabase: SupabaseService,
  ) {}

  async createProject(
    data: CreateProjectDto,
    thumbnail: Express.Multer.File,
    createdBy: number = 1,
    updatedBy: number = 1,
  ): Promise<ProjectModel> {
    const uploadThumbnail = await this.supabase.uploadFile(
      thumbnail,
      'projects/thumbnails',
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
    return this.projectRepository.createProject(projectData);
  }
}
