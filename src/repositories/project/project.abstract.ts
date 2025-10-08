import { Injectable } from '@nestjs/common';
import { ProjectModel, CreateProjectModel } from 'src/models/project';

@Injectable()
export abstract class IProjectRepository {
  abstract createProject(data: CreateProjectModel): Promise<ProjectModel>;
}
