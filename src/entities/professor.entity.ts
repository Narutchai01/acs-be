import { Professor } from "@prisma/client";
import { UserEntity } from "./user.entity";

export class ProfessorEntity implements Professor {
    id: number;
    userId: number;
    academicPosition: number;
    majorPosition: number;
    profRoom: string;
    fieldOffexpertise: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date | null;
    createdBy: number;
    updatedBy: number;
    user: UserEntity;
}
