import { Course } from "@prisma/client";
import { UserEntity } from "./user.entity";

export class CourseEntity implements Course {
    id: number
    courseId: string
    courseName: string
    courseDetail: string
    createdDate: Date
    updatedDate: Date
    createdBy: number
    updatedBy: number
    user: UserEntity
}
