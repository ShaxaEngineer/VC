// src/news/news.controller.ts

import {
   Controller,
   Post,
   Get,
   Put,
   Delete,
   Body,
   Param,
   BadRequestException,
   UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import {
   ApiTags,
   ApiOperation,
   ApiResponse,
   ApiParam,
   ApiBearerAuth,
   ApiBody,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import {
   CreateNewsDtoSW,
   UpdateNewsDtoSW,
   NewsResponseDto,
   GetAllNewsResponseDto,
} from '../swagger/news.sw.dto';

@ApiTags('News')
@ApiBearerAuth()
@Controller('news')
export class NewsController {
   constructor(private readonly newsService: NewsService) { }

   @Get('')
   @ApiOperation({ summary: 'Get all news articles' })
   @ApiResponse({ status: 200, type: GetAllNewsResponseDto })
   async getAll() {
      try {
         const response = await this.newsService.findAll();
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         throw new BadRequestException('Failed to fetch news articles');
      }
   }

   @Get(':id')
   @ApiParam({ name: 'id', required: true, description: 'News ID' })
   @ApiOperation({ summary: 'Get news article by ID' })
   @ApiResponse({ status: 200, type: NewsResponseDto })
   @ApiResponse({ status: 404, description: 'News not found' })
   async getOne(@Param('id') id: string) {
      try {
         const response = await this.newsService.findOne(id);
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         throw new BadRequestException('Failed to fetch news article');
      }
   }

   @Post('create')
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Create a news article' })
   @ApiBody({ type: CreateNewsDtoSW })
   @ApiResponse({ status: 201, type: NewsResponseDto })
   async create(@Body() createNewsDto: CreateNewsDto) {
      try {
         return await this.newsService.create(createNewsDto);
      } catch (error) {
         throw new BadRequestException('Failed to create news article');
      }
   }

   @Put(':id')
   @UseGuards(AdminGuard)
   @ApiParam({ name: 'id', required: true, description: 'News ID' })
   @ApiOperation({ summary: 'Update a news article' })
   @ApiBody({ type: UpdateNewsDtoSW })
   @ApiResponse({ status: 200, type: NewsResponseDto })
   async update(
      @Param('id') id: string,
      @Body() updateNewsDto: UpdateNewsDto,
   ) {
      try {
         return await this.newsService.update(id, updateNewsDto);
      } catch (error) {
         throw new BadRequestException('Failed to update news article');
      }
   }

   @Delete(':id')
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Delete a news article' })
   @ApiParam({ name: 'id', required: true })
   @ApiResponse({
      status: 200,
      description: 'News article deleted successfully',
   })
   async delete(@Param('id') id: string) {
      try {
         await this.newsService.remove(id);
         return {
            message: 'success',
            statusCode: 200,
            data: `News with ID ${id} deleted successfully.`,
         };
      } catch (error) {
         throw new BadRequestException('Failed to delete news article');
      }
   }
}
