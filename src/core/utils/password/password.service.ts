import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    // Use a library like bcrypt to hash the password
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Use a library like bcrypt to compare the password
    return await bcrypt.compare(password, hashedPassword);
  }
  async generateRandomPassword(length: number): Promise<string> {
    const baseAPI = `https://api.genratr.com/?length=${length}&uppercase&lowercase&numbers`;

    try {
      const response = await axios.get(baseAPI);
      if (response.status === 200) {
        return response.data.password as string;
      } else {
        throw new HttpException('Failed to generate password', 500);
      }
    } catch {
      throw new HttpException('Failed to generate password', 500);
    }
  }
}
