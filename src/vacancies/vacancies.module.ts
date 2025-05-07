import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { Vacancy, VacancySchema } from '../models/vacancies.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
    AuthModule,
    ImageModule,
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService, ImageService],
})
export class VacanciesModule { }
