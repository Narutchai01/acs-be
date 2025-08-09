import { BaseModel } from ".";
import { UserModel } from "./user";

export interface MajorPositionModel extends BaseModel {
  id: number;
  name: string;
  user: UserModel;
}