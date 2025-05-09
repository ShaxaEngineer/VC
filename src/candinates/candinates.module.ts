import { Module } from '@nestjs/common';
import { CandinatesController } from './candinates.controller';
import { CandinatesService } from './candinates.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CandinateSchema, Candinate } from 'src/models/candinates.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candinate.name, schema: CandinateSchema }]),
    AuthModule,
    ImageModule
  ],
  controllers: [CandinatesController],
  providers: [CandinatesService, ImageService]
})
export class CandinatesModule { }
