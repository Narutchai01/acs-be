// utils/response.helper.ts
import { HttpStatus } from '@nestjs/common';

export function success<T>(data: T, statusCode: number = HttpStatus.OK) {
  return { data, statusCode };
}
