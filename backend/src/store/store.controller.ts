import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { UpdateStoreProfileDto } from './dto/update-store-profile.dto';
import { StoreService } from './store.service';

// Ajusta este import a la ruta real de tu guard JWT
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('store')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  private getUserIdFromRequest(req: Request & { user?: any }): string {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const userId =
      user.id || user._id || user.sub || user.userId || null;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return String(userId);
  }

  @Get('profile')
  async getMyStoreProfile(@Req() req: Request & { user?: any }) {
    const userId = this.getUserIdFromRequest(req);

    const store = await this.storeService.findByUserId(userId);

    return {
      store: store || null,
    };
  }

  @Post('profile')
  async upsertMyStoreProfile(
    @Req() req: Request & { user?: any },
    @Body() dto: UpdateStoreProfileDto,
  ) {
    const userId = this.getUserIdFromRequest(req);

    const store = await this.storeService.upsertProfile(userId, dto);

    return {
      ok: true,
      store,
    };
  }
}
