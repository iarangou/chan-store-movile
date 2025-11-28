import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  getPing() {
    // Mantenemos el mismo contrato de respuesta que en la versión web
    return {
      ok: true,
      via: 'app-router',
    };
  }
}
