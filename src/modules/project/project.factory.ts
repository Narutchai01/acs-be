import { Injectable } from '@nestjs/common';
import { StudentFactory } from '../students/students.factory';
import { ProjectDto } from 'src/modules/project/dto/v1/project.dto';
import { ProjectModel } from 'src/models/project';

@Injectable()
export class ProjectFactory {
  constructor(private studentFactory: StudentFactory) {}
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
    };
  }
}
