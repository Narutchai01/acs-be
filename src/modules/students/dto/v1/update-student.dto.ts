import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStudentDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  studentId?: string;
  @ApiProperty({ required: false })
  @IsString()
  linkedin?: string | null;
  @ApiProperty({ required: false })
  @IsString()
  facebook?: string | null;
  @ApiProperty({ required: false })
  @IsString()
  instagram?: string | null;
  @ApiProperty({ required: false })
  @IsString()
  github?: string | null;
  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  classBookId?: number;
}
