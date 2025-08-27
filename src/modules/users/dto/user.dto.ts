import { BaseDto } from 'src/models/dto/base.dto';
export class UserDto extends BaseDto {
  id!: number;
  firstNameTh!: string;
  lastNameTh!: string;
  firstNameEn: string | null;
  lastNameEn: string | null;
  email: string;
  nickName: string | null;
  imageUrl?: string | null;
}
