import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { DebugController } from './dto/debug.controller';

@Module({
  imports: [EmailModule],
  controllers: [DebugController],
})
export class DebugModule {}
