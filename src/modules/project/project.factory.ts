import { Injectable } from '@nestjs/common';
import { StudentFactory } from '../students/students.factory';
import { ProjectDto } from 'src/modules/project/dto/v1/project.dto';
import { ProjectModel } from 'src/models/project';
import { CourseFactory } from '../course/course.factory';

@Injectable()
export class ProjectFactory {
  constructor(
    private studentFactory: StudentFactory,
    private courseFactory: CourseFactory,
  ) {}
  mapProjectModelToProjectDto(model: ProjectModel): ProjectDto {
    return {
      id: model.id,
      title: model.title,
      detail: model.detail,
      thumbnail: model.thumbnail,
      github: model.github || null,
      presentation: model.presentation || null,
      document: model.document || null,
      figma: model.figma || null,
      youtube: model.youtube || null,
      projectAssets:
        model.projectAssets?.map((asset) => ({
          id: asset.id,
          asset: asset.asset,
        })) || [],
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      projectMembers:
        model.projectMembers?.map((member) =>
          this.studentFactory.mapStudentModelToStudentDto(member),
        ) || [],
      projectCategories:
        model.projectCategories?.map((category) => ({
          id: category.id,
          name: category.name,
        })) || [],
      projectFields:
        model.projectFields?.map((field) => ({
          id: field.id,
          name: field.name,
        })) || [],
      projectTypes:
        model.projectTypes?.map((type) => ({
          id: type.id,
          name: type.name,
        })) || [],  
      courses: model.projectCourses
        ? this.courseFactory.mapCourseModelsToCourseDtos(model.projectCourses)
        : [],
    };
  }
}
