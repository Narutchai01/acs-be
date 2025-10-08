import {
  Project,
  // ProjectMember,
  // ProjectCategory,
  // ProjectFields,
} from '@prisma/client';

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
}

// export class ProjectMemberEntity implements ProjectMember {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
//   createdBy: number;
//   updatedBy: number;
//   projectId: number;
//   userId: number;
//   studentId: number | null;
//   student: StudentEntity | null;
// }

// export class ProjectCategoryEntity implements ProjectCategory {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
//   createdBy: number;
//   updatedBy: number;
//   projectId: number;
//   listTypeId: number;
//   listType: ListTypeEntity;
// }

// export class ProjectFieldsEntity implements ProjectFields {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
//   createdBy: number;
//   updatedBy: number;
//   projectId: number;
//   listTypeId: number;
//   listType: ListTypeEntity;
// }
