import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStudentDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  studentId?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  linkedin?: string | null;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  facebook?: string | null;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instagram?: string | null;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  github?: string | null;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  classBookId?: number;
}
