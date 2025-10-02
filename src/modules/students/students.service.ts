import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStudentRepository } from 'src/repositories/student/student.abstract';
import { RequestStudentModel, StudentModel } from 'src/models/student';
import { CreateStudentDto } from './dto/v1/create-student.dto';
import { UsersService } from '../users/users.service';
import { QueryStudentsDto } from './dto/v1/get-student.dto';
import { Pageable } from 'src/models';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
@Injectable()
export class StudentsService {
  constructor(
    private studentRepository: IStudentRepository,
    private userService: UsersService,
    private roleRepository: IRoleRepository,
  ) {}

  async createStudent(
    data: CreateStudentDto,
    createdBy: number,
    classBookId: number,
  ): Promise<StudentModel> {
    const {
      firstNameTh,
      lastNameTh,
      firstNameEn,
      lastNameEn,
      nickName,
      email,
    } = data;

    const userData = {
      firstNameTh,
      lastNameTh,
      firstNameEn,
      lastNameEn,
      nickName,
      email,
      password: null,
      createdBy,
      updatedBy: createdBy,
    };
    const { user } = await this.userService.createUserV2(
      userData,
      null,
      'student',
      false,
    );
    if (!user) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const role = await this.roleRepository.getByName('student');
    if (role instanceof Error) {
      throw new HttpException(
        `Role not found: ${role.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userRole = await this.roleRepository.createUserRole({
      userId: user.id,
      roleId: role.id,
      createdBy,
    });

    if (!userRole) {
      throw new HttpException(
        'Failed to assign role to user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const studentData: RequestStudentModel = {
      userId: user.id,
      studentId: data.studentId,
      classBookId: classBookId,
      createdBy,
      updatedBy: createdBy,
    };

    const student = await this.studentRepository.create(studentData);
    if (!student) {
      throw new HttpException(
        'Failed to create student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return student;
  }

  async createStudents(
    data: CreateStudentDto[],
    createdBy: number,
    classBookId: number,
  ): Promise<StudentModel[]> {
    const students: StudentModel[] = [];
    for (const studentDto of data) {
      const student = await this.createStudent(
        studentDto,
        createdBy,
        classBookId,
      );
      students.push(student);
    }
    return students;
  }

  async getStudents(query: QueryStudentsDto): Promise<Pageable<StudentModel>> {
    const [students, count] = await Promise.all([
      this.studentRepository.getList(query),
      this.studentRepository.count(query),
    ]);
    return {
      rows: students,
      totalRecords: count,
      page: query.page,
      pageSize: query.pageSize,
    };
  }

  async getStudentByUserId(userId: number): Promise<StudentModel> {
    return this.studentRepository.getByUserId(userId);
  }

  async getStudentById(id: number): Promise<StudentModel> {
    return this.studentRepository.getById(id);
  }
}
