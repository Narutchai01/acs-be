import { Injectable } from '@nestjs/common';
import { CourseModel, CraeteCourseModel, UpdateCourseModel } from 'src/models/course';

@Injectable()
export abstract class ICourseRepository {
    constructor() { }
    // abstract getCourse(): Promise<CourseModel[]>;
    // abstract getCourseById(): Promise<CourseModel>;
    abstract createCourse(data: CraeteCourseModel): Promise<CourseModel>;
    // abstract updateCourse(id: number, data: UpdateCourseModel): Promise<CourseModel>;
    // abstract deleteCourse(id: number, userId: number): Promise<CourseModel>;
}
