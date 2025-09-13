import { HttpException, Injectable } from '@nestjs/common';
import { ProfessorModel } from 'src/models/professor';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { PasswordService } from 'src/core/utils/password/password.service';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from 'src/modules/users/users.service';
import type { File as MulterFile } from 'multer';

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
    image: MulterFile,
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

  async createProfessorV2(
    data: CreateProfessorDtoV1,
    createBy: number,
    file?: MulterFile,
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
}
