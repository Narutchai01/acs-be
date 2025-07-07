import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Unique identifier for the course',
    example: 'CSS101',
  })
  @IsString()
  @IsNotEmpty()
  readonly courseId: string;

  @ApiProperty({
    description: 'Type identifier for the course',
    example: 1,
  })
  @IsNumber()
  readonly typeCourseId: number;

  @ApiProperty({
    description: 'Name of the course in Thai',
    example: 'วิทยาศาสตร์คอมพิวเตอร์',
  })
  @IsString()
  @IsNotEmpty()
  readonly courseNameTh: string;

  @ApiProperty({
    description: 'Name of the course in English',
    example: 'Computer Science',
  })
  @ApiProperty({
    description: 'Number of credits for the course',
    example: 'Data Structures and Algorithms',
  })
  @IsString()
  @IsNotEmpty()
  readonly courseNameEn: string;

  @ApiProperty({
    description: 'Number of credits for the course',
    example: '(4-3-4)',
  })
  @IsString()
  @IsNotEmpty()
  readonly credits: string;

  @ApiProperty({
    description: 'Detailed description of the course',
    example: 'This course covers the fundamentals of computer science.',
  })
  @IsString()
  @IsNotEmpty()
  readonly courseDetail: string;
}
