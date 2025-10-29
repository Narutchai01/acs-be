import { Injectable } from '@nestjs/common';
import {
  ForgetPasswordCredentialsModel,
  RequestPasswordRequestCredentialsModel,
} from 'src/models/auth';

@Injectable()
export abstract class IAuthRepository {
  abstract createForgetPasswordCredential(
    data: RequestPasswordRequestCredentialsModel,
  ): Promise<ForgetPasswordCredentialsModel>;
  abstract getForgetPasswordCredentialByRefCode(
    refferenceCode: string,
  ): Promise<ForgetPasswordCredentialsModel | null>;
}
