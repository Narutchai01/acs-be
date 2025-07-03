import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';

export class UpdateCourseDTO extends BaseDto {
    @ApiProperty({ required: false })
    courseId?: string
    @ApiProperty({ required: false })
    courseName?: string
    @ApiProperty({ required: false })
    courseDetail?: string
}
