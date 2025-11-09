import { HttpException, Injectable } from '@nestjs/common';
import { ProfessorModel } from 'src/models/professor';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { PasswordService } from 'src/core/utils/password/password.service';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from 'src/modules/users/users.service';
import { Pageable } from 'src/models';
import { QueryProfessorDto } from './dto/get-professors.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    private professorRepository: IProfessorRepository,
    private userRepository: IUserRepository,
    private passwordService: PasswordService,
    private supabaseService: SupabaseService,
    private mailService: MailService,
    private userService: UsersService,
  ) {}

  //TODO: clean after demo
  async createProfessor(
    data: CreateProfessorDtoV1,
    image: Express.Multer.File,
    createBy: number,
  ): Promise<ProfessorModel> {
    let password: string = '';
    let hashPassword: string = '';
    if (data.isPassword) {
      password = await this.passwordService.generateRandomPassword(8);
      hashPassword = await this.passwordService.hashPassword(password);
    }

    const image_url = await this.supabaseService.uploadFile(image, 'professor');

    if (!image_url) {
      throw new HttpException('Failed to upload image', 500);
    }

    const userData = {
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn,
      lastNameEn: data.lastNameEn,
      email: data.email,
      imageUrl: image_url,
      password: hashPassword,
      createdBy: createBy,
      updatedBy: createBy,
    };

    const user = await this.userRepository.createUser(userData);

    const professorData = {
      userId: user.id,
      majorPositionId: data.majorPositionId,
      academicPositionId: data.academicPositionId,
      phone: data.phone,
      profRoom: data.profRoom,
      createdBy: createBy,
      updatedBy: createBy,
    };

    let professor =
      await this.professorRepository.createProfessor(professorData);

    const educations = data.education.map((education) => ({
      professorId: professor.id,
      education: education.education,
      levelId: education.levelId,
      university: education.university,
      createdBy: createBy,
      updatedBy: createBy,
    }));

    const expertFields = data.expertFields.map((field) => ({
      professorId: professor.id,
      field: field,
    }));

    await this.professorRepository.createEducations(educations);
    await this.professorRepository.createExpertFields(expertFields);

    professor = await this.professorRepository.getProfessorById(professor.id);

    if (data.isPassword && password) {
      await this.mailService.sendProfessorCode(user.email, password);
    }

    return professor;
  }
  async getProfessorById(id: number): Promise<ProfessorModel> {
    return this.professorRepository.getProfessorById(id);
  }

  async createProfessorV2(
    data: CreateProfessorDtoV1,
    createBy: number,
    file?: Express.Multer.File,
  ) {
    const {
      firstNameTh,
      lastNameTh,
      firstNameEn,
      lastNameEn,
      email,
      nickName,
    } = data;

    const { user, password } = await this.userService.createUserV2(
      {
        firstNameTh,
        lastNameTh,
        firstNameEn,
        lastNameEn,
        email,
        nickName,
        createdBy: createBy,
        updatedBy: createBy,
      },
      file,
      'professor',
    );

    let professor: ProfessorModel;

    const professorData = {
      userId: user.id,
      majorPositionId: data.majorPositionId,
      academicPositionId: data.academicPositionId,
      profRoom: data.profRoom,
      phone: data.phone,
      createdBy: createBy,
      updatedBy: createBy,
    };

    professor = await this.professorRepository.createProfessor(professorData);

    const educations = data.education.map((education) => ({
      professorId: professor.id,
      education: education.education,
      levelId: education.levelId,
      university: education.university,
      createdBy: createBy,
      updatedBy: createBy,
    }));

    const expertFields = data.expertFields.map((field) => ({
      professorId: professor.id,
      field: field,
    }));

    await this.professorRepository.createEducations(educations);
    await this.professorRepository.createExpertFields(expertFields);

    if (user.password && password) {
      await this.mailService.sendProfessorCode(user.email, password);
    }

    professor = await this.professorRepository.getProfessorById(professor.id);
    return professor;
  }

  async getProfessors(
    query: QueryProfessorDto,
  ): Promise<Pageable<ProfessorModel>> {
    const [professors, count] = await Promise.all([
      this.professorRepository.getProfessors(query),
      this.professorRepository.countProfessors(query),
    ]);
    return {
      rows: professors,
      totalRecords: count,
      page: query.page || 1,
      pageSize: query.pageSize || 10,
    };
  }

  async updateProfessor(
    id: number,
    data: UpdateProfessorDto,
    file?: Express.Multer.File,
    updatedBy?: number,
  ): Promise<ProfessorModel> {
    const userUpdateData = {
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn,
      lastNameEn: data.lastNameEn,
      email: data.email || undefined,
      nickName: data.nickName,
    };

    if (data.deletedEducationIds && data.deletedEducationIds.length > 0) {
      await this.professorRepository.deleteEducationByducationId(
        data.deletedEducationIds,
      );
    }

    if (data.updatedEducation && data.updatedEducation.length > 0) {
      await this.professorRepository.updateEducation(id, data.updatedEducation);
    }

    if (data.newEducation && data.newEducation.length > 0) {
      await this.professorRepository.createEducations(
        data.newEducation.map((education) => ({
          professorId: id,
          education: education.education,
          levelId: education.levelId,
          university: education.university,
          createdBy: updatedBy || 1,
          updatedBy: updatedBy || 1,
        })),
      );
    }

    if (data.deletedExpertFieldIds && data.deletedExpertFieldIds.length > 0) {
      await this.professorRepository.deleteExpertFields(
        data.deletedExpertFieldIds,
      );
    }

    if (data.updatedExpertFields && data.updatedExpertFields.length > 0) {
      await this.professorRepository.updateExpertFields(
        id,
        data.updatedExpertFields,
      );
    }

    if (data.newExpertFields && data.newExpertFields.length > 0) {
      await this.professorRepository.createExpertFields(
        data.newExpertFields.map((field) => ({
          professorId: id,
          field: field,
        })),
      );
    }

    const user = await this.userService.updateUser(
      id,
      userUpdateData,
      file || null,
      'professor',
    );
    return this.professorRepository.updateProfessor(id, {
      ...data,
      updatedBy: user.id,
    });
  }
}
