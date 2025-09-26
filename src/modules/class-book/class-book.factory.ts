import { Injectable } from '@nestjs/common';
import { ClassBookModel } from 'src/models/class-book';
import { ClassBookDtoV1 } from './dto/class-book.dto.v1';

@Injectable()
export class ClassBookFactory {
  mapClassBookModelsToClassBookDtos(dto: ClassBookModel[]): ClassBookDtoV1[] {
    return dto.map((item) => this.mapClassBookModelToClassBookDto(item));
  }

  mapClassBookModelToClassBookDto(model: ClassBookModel): ClassBookDtoV1 {
    const dto = {
      id: model.id,
      firstYearAcademic: model.firstYearAcademic,
      image: model.image,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
      createdBy: model.createdBy,
      updatedBy: model.updatedBy,
    };
    return dto;
  }
}
