import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCurriculumDto {
  @ApiProperty({ example: '2023', description: 'Academic year' })
  @IsString()
  year: string;

  @ApiProperty({
    example: 'http://example.com/curriculum.pdf',
    description: 'File URL',
  })
  @IsString()
  fileUrl: string;

  @ApiProperty({
    example: 'Curriculum description',
    description: 'Description',
  })
  @IsString()
  description: string;
}
