import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}
  async sendProfessorCode(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Professor Access Code',
        text: `Your access code is: ${code}`,
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto">
            <h2>Professor Access Code</h2>
            <p>สวัสดีครับ/ค่ะ</p>
            <p>รหัสสำหรับเข้าใช้งานของคุณคือ:</p>
            <p style="font-size:20px;font-weight:700;letter-spacing:1px">${code}</p>
            <p>นำรหัสดังกล่าวไปใช้เปิดการใช้งานบัญชีของคุณ</p>
          </div>
        `,
      });
    } catch (error) {
      this.logger.error(
        `Send email to ${email} failed`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
