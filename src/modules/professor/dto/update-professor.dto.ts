import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { CreateEducationDtoV1 } from './create-professor.dto.v1';

export class UpdateEducationDto {
  id: number;
  education: string;
  university: string;
  levelId: number;
}

export class UpdateExpertFieldDto {
  id: number;
  expertField: string;
}

export class UpdateProfessorDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) =>
    value !== null ? Number(value) : value,
  )
  academicPositionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) =>
    value !== null ? Number(value) : value,
  )
  majorPositionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) =>
    value !== null ? String(value) : value,
  )
  profRoom?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) =>
    value !== null ? String(value) : value,
  )
  phone?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as CreateEducationDtoV1[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  newEducation: CreateEducationDtoV1[];

  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Partial<UpdateEducationDto>[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  updatedEducation: Partial<UpdateEducationDto>[];

  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as number[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  deletedEducationIds: number[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as string[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  newExpertFields?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Partial<UpdateExpertFieldDto>[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  updatedExpertFields?: Partial<UpdateExpertFieldDto>[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as number[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  deletedExpertFieldIds?: number[];
}
