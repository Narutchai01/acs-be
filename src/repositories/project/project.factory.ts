import { Injectable } from '@nestjs/common';
import { ProjectEntity } from 'src/entities/project.entity';
import { ProjectModel } from 'src/models/project';

@Injectable()
export class ProjectFactory {
  mapProjectEntitiesToProjectModels(entities: ProjectEntity[]): ProjectModel[] {
    return entities.map((entity) =>
      this.mapProjectEntityToProjectModel(entity),
    );
  }
  mapProjectEntityToProjectModel(entity: ProjectEntity): ProjectModel {
    return {
      id: entity.id,
      title: entity.title,
      thumbnail: entity.thumbnail,
      detail: entity.detail,
      github: entity.github,
      presentation: entity.presentation,
      document: entity.document,
      figma: entity.figma,
      youtube: entity.youtube,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    };
  }
}
