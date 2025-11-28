import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = Number(this.configService.get<string>('SMTP_PORT') ?? '587');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  async sendResetPasswordEmail(to: string, url: string): Promise<SentMessageInfo> {
    const from =
      this.configService.get<string>('SMTP_FROM') ||
      this.configService.get<string>('SMTP_USER') ||
      '"Soporte" <no-reply@example.com>';

    const mailOptions: Mail.Options = {
      from,
      to,
      subject: 'Restablecer contraseña',
      text: `Has solicitado restablecer tu contraseña. Usa el siguiente enlace: ${url}`,
      html: `
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <p><a href="${url}">${url}</a></p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      this.logger.error(
        `Error enviando correo de restablecimiento a ${to}`,
        (error as any)?.stack || String(error),
      );
      // Re-lanzamos el error para que el controlador pueda formatear la respuesta
      throw error;
    }
  }
}
