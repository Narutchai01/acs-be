import { Injectable } from '@nestjs/common';
import {
  ProjectModel,
  CreateProjectModel,
  CreateProjectAssetModel,
  CreateProjectMemberModel,
} from 'src/models/project';
import { QueryProjectDto } from 'src/modules/project/dto/v1/get-project.dto';

@Injectable()
export abstract class IProjectRepository {
  abstract createProject(data: CreateProjectModel): Promise<ProjectModel>;
  abstract createProjectAsset(data: CreateProjectAssetModel[]): Promise<void>;
  abstract getProjects(query: QueryProjectDto): Promise<ProjectModel[]>;
  abstract getProjectById(id: number): Promise<ProjectModel>;
  abstract createProjectMember(data: CreateProjectMemberModel[]): Promise<void>;
}
