import { BaseDto } from 'src/models/dto/base.dto';
import { EducationLevelDto } from 'src/modules/masterdata/dto/educationlevel.v1.dto';

export class EducationDtoV1 extends BaseDto {
  education: string;
  university: string;
  level: EducationLevelDto;
}
