import { Injectable } from '@nestjs/common';
import { ProjectAssetEntity, ProjectEntity } from 'src/entities/project.entity';
import { ProjectAssetModel, ProjectModel } from 'src/models/project';
import { StudentFactory } from '../student/student.factory';

@Injectable()
export class ProjectFactory {
  constructor(private studentFactory: StudentFactory) {}
  mapProjectEntitiesToProjectModels(entities: ProjectEntity[]): ProjectModel[] {
    return entities.map((entity) =>
      this.mapProjectEntityToProjectModel(entity),
    );
  }
  mapProjectEntityToProjectModel(entity: ProjectEntity): ProjectModel {
    const studentEntities = entity.ProjectMember?.map((pm) => pm.student) || [];

    const studentModels =
      studentEntities.length > 0
        ? this.studentFactory.mapStudentEntityToStudentModels(
            studentEntities.filter((entity) => entity !== null),
          )
        : [];

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
      projectAssets: this.mapProjectAssetEntitiesToProjectAssetModels(
        entity.ProjectAsset ?? [],
      ),
      projectMembers: studentModels,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    };
  }

  mapProjectAssetEntitiesToProjectAssetModels(
    entities: ProjectAssetEntity[],
  ): ProjectAssetModel[] {
    const models = entities.map((entity: ProjectAssetEntity) =>
      this.mapProjectAssetEntityToProjectAssetModel(entity),
    );
    return models;
  }

  mapProjectAssetEntityToProjectAssetModel(
    data: ProjectAssetEntity,
  ): ProjectAssetModel {
    return {
      id: data.id,
      projectId: data.projectId,
      asset: data.asset,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }
}
