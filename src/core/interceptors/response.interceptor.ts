import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

interface ApiResponse<T> {
  status: boolean;
  data: T;
  error: null;
  statusCode: number;
}

interface ResponseData {
  statusCode?: number;
  data?: unknown;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((res: ResponseData | T): ApiResponse<T> => {
        const statusCode: number =
          (res as ResponseData)?.statusCode ?? response.statusCode ?? 200;
        return {
          status: true,
          data: ((res as ResponseData)?.data ?? res) as T,
          error: null,
          statusCode,
        };
      }),
    );
  }
}
