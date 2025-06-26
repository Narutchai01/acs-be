/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ICourseRepository } from "src/repositories/course/course.abstract";
import { CourseModel } from "src/models/course";
import { CreateCourseDTO } from "./dto/create-course.dto";

@Injectable()
export class NewsService {
    constructor(
        private courseRespository: ICourseRepository,
    ) { }

    async createCourse(
        createCourse: CreateCourseDTO,
        userId: number,
    ): Promise<CourseModel> {
        const data = {
            courseId: createCourse.courseId,
            courseName: createCourse.courseName,
            courseDetail: createCourse.courseDetail,
            createdBy: userId,
            updatedBy: userId,
        };

        return this.courseRespository.createCourse(data);
    }
}
