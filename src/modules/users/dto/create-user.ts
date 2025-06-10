export class CreateUserDto {
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn?: string | null;
  lastNameEn?: string | null;
  email: string;
  nickName?: string | null;
  password: string;
}
