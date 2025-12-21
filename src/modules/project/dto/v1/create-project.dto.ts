import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  github: string;

  @ApiProperty()
  @IsString()
  presentation: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  figma: string;

  @ApiProperty()
  @IsString()
  youtube: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty({
    description: 'List of project members',
    example: ['member1', 'member2', 'member3'],
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }
    if (typeof value === 'string') {
      // Handle JSON string format like "[1,2,3]"
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value) as unknown;
          return Array.isArray(parsed)
            ? parsed.map((item: unknown) => parseInt(String(item), 10))
            : [];
        } catch {
          return [];
        }
      }
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  members: number[];

  @ApiProperty({
    description: 'List of project categories',
    example: "['category1', 'category2', 'category3']",
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }
    if (typeof value === 'string') {
      // Handle JSON string format like "[1,2,3]"
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value) as unknown;
          return Array.isArray(parsed)
            ? parsed.map((item: unknown) => parseInt(String(item), 10))
            : [];
        } catch {
          return [];
        }
      }
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  categories: number[];

  @ApiProperty({
    description: 'List of project fields',
    example: "['field1', 'field2', 'field3']",
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }
    if (typeof value === 'string') {
      // Handle JSON string format like "[1,2,3]"
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value) as unknown;
          return Array.isArray(parsed)
            ? parsed.map((item: unknown) => parseInt(String(item), 10))
            : [];
        } catch {
          return [];
        }
      }
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  fields: number[];

  @ApiProperty({
    description: 'List of project types',
    example: "['type1', 'type2', 'type3']",
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }
    if (typeof value === 'string') {
      // Handle JSON string format like "[1,2,3]"
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value) as unknown;
          return Array.isArray(parsed)
            ? parsed.map((item: unknown) => parseInt(String(item), 10))
            : [];
        } catch {
          return [];
        }
      }
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  types: number[];

  @ApiProperty({
    description: 'List of project courses',
    example: "['course1', 'course2', 'course3']",
    required: false,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }
    if (typeof value === 'string') {
      // Handle JSON string format like "[1,2,3]"
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value) as unknown;
          return Array.isArray(parsed)
            ? parsed.map((item: unknown) => parseInt(String(item), 10))
            : [];
        } catch {
          return [];
        }
      }
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  courses: number[];
}
