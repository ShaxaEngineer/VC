import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnerService } from './partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from 'src/models/partners.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
    AuthModule,
    ImageModule
  ],
  controllers: [PartnersController],
  providers: [PartnerService, ImageService]
})
export class PartnersModule { }
