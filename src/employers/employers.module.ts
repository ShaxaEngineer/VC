// src/employers/employers.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { Employer, EmployerSchema } from '../models/emplyers.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employer.name, schema: EmployerSchema }]),
    AuthModule,
    ImageModule
  ],
  controllers: [EmployersController],
  providers: [EmployersService, ImageService],
})
export class EmployersModule { }
