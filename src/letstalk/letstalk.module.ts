// src/letstalk/letstalk.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LetstalkController } from './letstalk.controller';
import { LetstalkService } from './letstalk.service';
import { Letstalk, LetstalkSchema } from 'src/models/letstalk.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Letstalk.name, schema: LetstalkSchema }]),
    AuthModule
  ],
  controllers: [LetstalkController],
  providers: [LetstalkService],
})
export class LetstalkModule { }
