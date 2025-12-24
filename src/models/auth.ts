import { Request as ExpressRequest } from 'express';
import { BaseModel } from '.';

export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgetPasswordCredentialsModel extends BaseModel {
  refferenceCode: string;
  userId: number;
  expiredAt: Date;
  id: number;
}

export interface RequestPasswordRequestCredentialsModel {
  userId: number;
  refferenceCode: string;
  createdBy: number;
  updatedBy: number;
}
