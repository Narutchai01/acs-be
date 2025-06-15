import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NewModel } from "src/models/new";

@Injectable()
export abstract class INewRepository{
    abstract createNew(): Promise<>;
    abstract getNews(): Promise<>;
    abstract updateNew(): Promise<>;
    abstract deleteNew(): Promise<>;
}