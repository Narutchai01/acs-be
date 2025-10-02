import { Injectable } from '@nestjs/common';
import {
  RequestStudentModel,
  StudentModel,
  UpdateStudentModel,
} from '../../models/student';
import { QueryStudentsDto } from 'src/modules/students/dto/v1/get-student.dto';

@Injectable()
export abstract class IStudentRepository {
  abstract create(student: RequestStudentModel): Promise<StudentModel>;
  abstract getList(query: QueryStudentsDto): Promise<StudentModel[]>;
  abstract count(query: QueryStudentsDto): Promise<number>;
  abstract getByUserId(userId: number): Promise<StudentModel>;
  abstract getById(id: number): Promise<StudentModel>;
  abstract update(
    id: number,
    student: UpdateStudentModel,
  ): Promise<StudentModel>;
}
