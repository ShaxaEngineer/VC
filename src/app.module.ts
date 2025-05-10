import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CandinatesModule } from './candinates/candinates.module';
import { EmployersModule } from './employers/employers.module';
import { NewsModule } from './news/news.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './images/image.module';
import { ContactModule } from './contact/contact.module';
import { LetstalkModule } from './letstalk/letstalk.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/vacancies'),
    AdminModule,
    EmployersModule,
    NewsModule,
    CandinatesModule,
    ImageModule,
    VacanciesModule,
    MulterModule.register({
      limits: { fileSize: 5 * 1024 * 1024 }, // Enforce 5 MB max at the config level too
      dest: './uploads', // Set the destination directory for uploads
    }),
    AuthModule,
    ContactModule,
    // LetstalkModule
  ],
})
export class AppModule { }