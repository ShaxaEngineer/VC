import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/models/news.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/images/image.module';
import { ImageService } from 'src/images/image.service';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    AuthModule,
    ImageModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, ImageService]
})
export class NewsModule { }
