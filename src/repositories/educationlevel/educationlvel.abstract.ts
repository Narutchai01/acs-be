import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IEducationLevelRepository {
  abstract getEducationLevels(): Promise<string[]>;
}
