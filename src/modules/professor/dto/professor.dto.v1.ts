export class ProfessorDtoV1 {
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  email: string;
  profRoom: string;
  education: {
    education: string;
    levelId: number;
    university: string;
  }[];
  isPassword: boolean;
}
