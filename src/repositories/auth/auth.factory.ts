import { Injectable } from '@nestjs/common';
import { ForgetPasswordCredentialsModel } from '../../models/auth';
import { ForgetPasswordEntity } from 'src/entities/auth.entity';

@Injectable()
export class AuthFactory {
  mapForgetPasswordCredentialsEntityToForgetPasswordCredentialsModel(
    data: ForgetPasswordEntity,
  ): ForgetPasswordCredentialsModel {
    return {
      id: data.id,
      userId: data.userId,
      expiredAt: data.expiredAt,
      refferenceCode: data.refferenceCode,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      updatedBy: data.updatedBy,
      createdBy: data.createdBy,
    };
  }

  mapForgetPasswordCrdedentialsEntitiesToForgetPasswordCredentialsModels(
    data: ForgetPasswordEntity[],
  ): ForgetPasswordCredentialsModel[] {
    return data.map((item) =>
      this.mapForgetPasswordCredentialsEntityToForgetPasswordCredentialsModel(
        item,
      ),
    );
  }
}
