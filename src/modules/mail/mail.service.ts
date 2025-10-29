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

  async sendForgetPasswordCredential(
    email: string,
    code: string,
    domain: string,
  ) {
    try {
      const credential = `${domain}/auth/reset-password?referenceCode=${code}`;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset link is: ${credential}`,
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto">
        <h2>Password Reset Code</h2>
        <p>สวัสดีครับ/ค่ะ</p>
        <p>คลิกที่ลิงก์ด้านล่างเพื่อตั้งค่ารหัสผ่านใหม่ของคุณ:</p>
        <p><a href="${credential}" style="font-size:20px;font-weight:700;letter-spacing:1px;color:#007bff;text-decoration:none">${credential}</a></p>
        <p>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาละเว้นอีเมลนี้</p>
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
