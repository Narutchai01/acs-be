import {
  Project,
  ProjectAsset,
  ProjectMember,
  ProjectCategory,
  ProjectFields,
  ProjectCourse,
  ProjectType
} from '@prisma/client';
import { StudentEntity } from './student.entity';
import { ListTypeEntity } from './type.entity';
import { CourseEntity } from './course.entity';

export class ProjectEntity implements Project {
  id: number;
  title: string;
  thumbnail: string;
  detail: string;
  github: string | null;
  presentation: string | null;
  document: string | null;
  figma: string | null;
  youtube: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  ProjectAsset: ProjectAssetEntity[];
  ProjectMember: ProjectMemberEntity[];
  ProjectCategories: ProjectCategoryEntity[];
  ProjectFields: ProjectFieldEntity[];
  ProjectCourse: ProjectCourseEntity[];
  ProjectTypes: ProjectTypeEntity[];
}

export class ProjectAssetEntity implements ProjectAsset {
  id: number;
  projectId: number;
  asset: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  project: ProjectEntity;
}

export class ProjectMemberEntity implements ProjectMember {
  id: number;
  projectId: number;
  studentId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  project: ProjectEntity;
  student: StudentEntity;
}

export class ProjectCategoryEntity implements ProjectCategory {
  id: number;
  projectId: number;
  listTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  project: ProjectEntity;
  listType: ListTypeEntity;
}

export class ProjectFieldEntity implements ProjectFields {
  id: number;
  projectId: number;
  listTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  project: ProjectEntity;
  listType: ListTypeEntity;
}

export class ProjectTypeEntity implements ProjectType {
  id: number;
  projectId: number;
  listTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  project: ProjectEntity;
  listType: ListTypeEntity;
}
export class ProjectCourseEntity implements ProjectCourse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  projectId: number;
  courseId: number;
  project: ProjectEntity;
  course: CourseEntity;
}
