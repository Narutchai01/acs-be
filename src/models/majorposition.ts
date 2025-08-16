import { BaseModel } from '.';
import { UserModel } from './user';

export interface MajorPositionModel extends BaseModel {
  id: number;
  positionTh: string;
  positionEn: string;
  users: UserModel[];
}
