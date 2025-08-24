import { HttpException, Injectable } from '@nestjs/common';
import { ProfessorModel } from 'src/models/professor';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { PasswordService } from 'src/core/utils/password/password.service';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';

@Injectable()
export class ProfessorService {
  constructor(
    private professorRepository: IProfessorRepository,
    private userRepository: IUserRepository,
    private passwordService: PasswordService,
    private supabaseService: SupabaseService,
  ) {}

  async createProfessor(
    data: CreateProfessorDtoV1,
    image: Express.Multer.File,
    createBy: number,
  ): Promise<ProfessorModel> {
    const password = data.isPassword
      ? await this.passwordService.hashPassword(
          await this.passwordService.generateRandomPassword(12),
        )
      : null;

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
      password: password,
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

    return await this.professorRepository.createProfessor(professorData);
  }
}
