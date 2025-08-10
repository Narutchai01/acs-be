/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { IAcademicPositionRepository } from './academicposition.abstract';
import { AcademicPositionFactory } from './academicposition.factory';
import { AcademicPositionModel } from 'src/models/academicposition';

@Injectable()
export class AcademicPositionRepository implements IAcademicPositionRepository {
    constructor(
        private prisma: PrismaService,
        private AcademicPositionFactory: AcademicPositionFactory,
    ) { }
    async getAcademicPosition(): Promise<AcademicPositionModel[]> {
        const academicPosition = await this.prisma.academicPosition.findMany();
        if (!academicPosition) {
            throw new HttpException('Academic position not found', HttpStatus.NOT_FOUND);
        }
        return this.AcademicPositionFactory.mapAcademicPositionEntitiesToAcademicPositionModels(
            academicPosition,
        );
    }
}
