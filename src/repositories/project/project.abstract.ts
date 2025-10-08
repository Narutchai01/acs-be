import { Injectable } from '@nestjs/common';
import {
  ProjectModel,
  CreateProjectModel,
  CreateProjectAssetModel,
} from 'src/models/project';

@Injectable()
export abstract class IProjectRepository {
  abstract createProject(data: CreateProjectModel): Promise<ProjectModel>;
  abstract createProjectAsset(data: CreateProjectAssetModel[]): Promise<void>;
  abstract getProjects(): Promise<ProjectModel[]>;
  abstract getProjectById(id: number): Promise<ProjectModel>;
}
