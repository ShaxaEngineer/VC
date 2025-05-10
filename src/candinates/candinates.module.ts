import { Module } from '@nestjs/common';
import { CandinatesController } from './candinates.controller';
import { CandinatesService } from './candinates.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CandinateSchema, Candinate } from 'src/models/candinates.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';
import { Vacancy, VacancySchema } from 'src/models/vacancies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candinate.name, schema: CandinateSchema },
      { name: Vacancy.name, schema: VacancySchema }
    ]),

    AuthModule,
    ImageModule
  ],
  controllers: [CandinatesController],
  providers: [CandinatesService, ImageService]
})
export class CandinatesModule { }
