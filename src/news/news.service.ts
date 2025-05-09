import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from '../models/news.schema';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
   constructor(
      @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
   ) { }

   async create(createNewsDto: CreateNewsDto): Promise<any> {
      try {
         const createdNews = new this.newsModel(createNewsDto);
         const response = await createdNews.save();
         return { message: 'success', statusCode: 201, data: response };
      } catch (error) {
         throw new BadRequestException('Failed to create news');
      }
   }

   async findAll(): Promise<any> {
      try {
         const response = await this.newsModel.find().exec();
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         throw new InternalServerErrorException('Failed to fetch news');
      }
   }

   async findOne(id: string): Promise<any> {
      try {
         const news = await this.newsModel.findById(id).exec();
         if (!news) {
            throw new NotFoundException(`News with ID ${id} not found`);
         }
         return { message: 'success', statusCode: 200, data: news };
      } catch (error) {
         throw new BadRequestException('Failed to fetch news');
      }
   }

   async update(id: string, updateNewsDto: UpdateNewsDto): Promise<any> {
      try {
         const newsDoc = await this.newsModel.findById(id).exec();
         if (!newsDoc) {
            throw new NotFoundException(`News with ID ${id} not found`);
         }

         Object.assign(newsDoc, updateNewsDto);

         const updated = await newsDoc.save();
         return { message: 'success', statusCode: 200, data: updated };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new BadRequestException('Failed to update news');
      }
   }

   async remove(id: string): Promise<any> {
      try {
         const newsDoc = await this.newsModel.findById(id).exec();
         if (!newsDoc) {
            throw new NotFoundException(`News with ID ${id} not found`);
         }

         await newsDoc.deleteOne();
         return { message: 'success', statusCode: 200, data: `News ${id} deleted` };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new InternalServerErrorException('Failed to delete news');
      }
   }
}
