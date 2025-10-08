import { BaseModel } from '.';

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

// export interface IProjectCategory {
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
