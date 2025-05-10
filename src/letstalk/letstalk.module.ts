import { Module } from '@nestjs/common';
import { LetstalkController } from './letstalk.controller';
import { LetstalkService } from './letstalk.service';

@Module({
  controllers: [LetstalkController],
  providers: [LetstalkService]
})
export class LetstalkModule {}
