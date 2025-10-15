import { Injectable } from '@nestjs/common';
import {
  ProjectAssetEntity,
  ProjectEntity,
  ProjectCategoryEntity,
  ProjectFieldEntity,
  ProjectCourseEntity,
} from 'src/entities/project.entity';
import {
  ProjectAssetModel,
  ProjectModel,
  ProjectCategoryModel,
  ProjectFieldModel,
  ProjectCourseModel,
} from 'src/models/project';
import { StudentFactory } from '../student/student.factory';
import { CourseFactory } from '../course/course.factory';

@Injectable()
export class ProjectFactory {
  constructor(
    private studentFactory: StudentFactory,
    private courseFactory: CourseFactory,
  ) {}
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

    const categoriesEntity =
      entity.ProjectCategories?.map((pc) => pc.listType) || [];

    const categoryModels =
      categoriesEntity.length > 0
        ? categoriesEntity.filter((entity) => entity !== null)
        : [];

    const fieldEntities = entity.ProjectFields?.map((pf) => pf.listType) || [];

    const fieldModels =
      fieldEntities.length > 0
        ? fieldEntities.filter((entity) => entity !== null)
        : [];

    const courseEntities = entity.ProjectCourse?.map((pc) => pc.course) || [];

    const courseModels =
      courseEntities.length > 0
        ? this.courseFactory.mapCourseEntitiesToCourseModels(
            courseEntities.filter((entity) => entity !== null),
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
      projectCategories: categoryModels,
      projectFields: fieldModels,
      projectCourses: courseModels,
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

  mapProjectCategoryEntityToProjectCategoryModel(
    data: ProjectCategoryEntity,
  ): ProjectCategoryModel {
    return {
      id: data.id,
      projectId: data.projectId,
      listTypeId: data.listTypeId,
      listType: data.listType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }

  mapProjectCategoryEntitiesToProjectCategoryModels(
    entities: ProjectCategoryEntity[],
  ): ProjectCategoryModel[] {
    return entities.map((entity) =>
      this.mapProjectCategoryEntityToProjectCategoryModel(entity),
    );
  }

  mapProjectFieldEntityToProjectFieldModel(
    data: ProjectFieldEntity,
  ): ProjectFieldModel {
    return {
      id: data.id,
      projectId: data.projectId,
      listTypeId: data.listTypeId,
      listType: data.listType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }

  mapProjectFieldEntitiesToProjectFieldModels(
    entities: ProjectFieldEntity[],
  ): ProjectFieldModel[] {
    return entities.map((entity) =>
      this.mapProjectFieldEntityToProjectFieldModel(entity),
    );
  }

  mapProjectCourseEntityToProjectCourseModel(
    entity: ProjectCourseEntity,
  ): ProjectCourseModel {
    return {
      id: entity.id,
      projectId: entity.projectId,
      courseId: entity.courseId,
      course: this.courseFactory.mapCourseEntityToCourseModel(entity.course),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    };
  }

  mapProjectCourseEntitiesToProjectCourseModels(
    entities: ProjectCourseEntity[],
  ): ProjectCourseModel[] {
    return entities.map((entity) =>
      this.mapProjectCourseEntityToProjectCourseModel(entity),
    );
  }
}
