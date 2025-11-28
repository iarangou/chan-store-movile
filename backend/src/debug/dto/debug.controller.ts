import {
    BadRequestException,
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../email/email.service';
import { SendMailDto } from '../dto/send-mail.dto';

@Controller('debug')
export class DebugController {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sendmail')
  async sendMail(@Body() body: SendMailDto) {
    const bodyTo = body.to?.trim();
    const envTo = (this.configService.get<string>('SMTP_USER') || '').trim();
    const to = (bodyTo || envTo || '').trim();
    const url = body.url || 'http://localhost:3000/reset/TEST';

    if (!to) {
      throw new BadRequestException({
        ok: false,
        code: 'EMAIL_REQUIRED',
        message: 'Falta "to" o SMTP_USER',
      });
    }

    try {
      const info = await this.mailService.sendResetPasswordEmail(to, url);

      return {
        ok: true,
        messageId: (info as any)?.messageId ?? null,
        accepted: (info as any)?.accepted ?? [],
        rejected: (info as any)?.rejected ?? [],
        envelope: (info as any)?.envelope ?? null,
      };
    } catch (e: any) {
      const status = e?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(
        {
          ok: false,
          code: e?.code || 'INTERNAL_ERROR',
          message: e?.message || 'Fallo enviando correo',
          smtp: {
            name: e?.name || null,
            command: e?.command || null,
            response: e?.response || null,
          },
        },
        status,
      );
    }
  }
}
