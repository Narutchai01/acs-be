import { UserModel } from "./user";

export interface CraeteCourseModel {
    courseName: string
    courseDetail: string
    createdBy: number;
    updatedBy: number;
}

export interface UpdateCourseModel {
    courseName: string
    courseDetail: string
}

export interface CourseModel {
    id: number
    courseId: string
    courseName: string
    courseDetail: string
    createdDate: Date
    updatedDate: Date
    createdBy: number
    updatedBy: number
    user: UserModel
}
