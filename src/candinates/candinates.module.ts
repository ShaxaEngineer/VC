import { Module } from '@nestjs/common';
import { CandinatesController } from './candinates.controller';
import { CandinatesService } from './candinates.service';

@Module({
  controllers: [CandinatesController],
  providers: [CandinatesService]
})
export class CandinatesModule {}
