import { BaseModel } from '.';
import { StudentModel } from './student';
import { ListTypeModel } from './type';
import { CourseModel } from './course';
export interface ProjectModel extends BaseModel {
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
  projectAssets?: ProjectAssetModel[];
  projectMembers?: StudentModel[];
  projectCategories?: ListTypeModel[];
  projectFields?: ListTypeModel[];
  projectCourses?: CourseModel[];
}

export interface CreateProjectModel {
  title: string;
  thumbnail: string;
  detail: string;
  github: string | null;
  presentation: string | null;
  document: string | null;
  figma: string | null;
  youtube: string | null;
  createdBy: number;
  updatedBy: number;
}

export interface CreateProjectAssetModel {
  projectId: number;
  asset: string;
  createdBy: number;
  updatedBy: number;
}

export interface ProjectAssetModel extends BaseModel {
  id: number;
  projectId: number;
  asset: string;
}

export interface ProjectMemberModel extends BaseModel {
  id: number;
  projectId: number;
  userId: number;
  studentId: number;
  student?: StudentModel | null;
  project?: ProjectModel | null;
}

export interface CreateProjectMemberModel {
  projectId: number;
  studentId: number;
  createdBy: number;
  updatedBy: number;
}
// Additional interfaces for related entities (currently commented out in entity file)
// export interface IProjectMember {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
//   createdBy: number;
//   updatedBy: number;
//   projectId: number;
//   userId: number;
//   studentId: number | null;
//   student: IStudent | null;
// }

export interface ProjectCategoryModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  projectId: number;
  listTypeId: number;
  listType: ListTypeModel;
}

export interface CreateProjectCategoryModel {
  projectId: number;
  listTypeId: number;
  createdBy: number;
  updatedBy: number;
}

// export interface IProjectFields {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
//   createdBy: number;
//   updatedBy: number;
//   projectId: number;
//   listTypeId: number;
//   listType: IListType;
// }
export interface ProjectFieldModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  projectId: number;
  listTypeId: number;
  listType: ListTypeModel;
}
export interface CreateProjectFieldModel {
  projectId: number;
  listTypeId: number;
  createdBy: number;
  updatedBy: number;
}

export interface ProjectCourseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  projectId: number;
  courseId: number;
  course: CourseModel;
}
export interface CreateProjectCourseModel {
  projectId: number;
  courseId: number;
  createdBy: number;
  updatedBy: number;
}
