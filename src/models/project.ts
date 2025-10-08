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
  projectAssets?: ProjectAssetModel[];
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
