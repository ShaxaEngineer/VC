// src/news/dto/news-swagger.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateNewsDtoSW {
   @ApiProperty({
      example: 'Breaking News: Market Hits Record High',
      description: 'Title of the news article',
      maxLength: 150,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(150, { message: 'Title must be at most 150 characters' })
   title: string;

   @ApiProperty({
      example: 'The stock market reached an all-time high today, with major indices...',
      description: 'Content of the news article',
      maxLength: 5000,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(5000, { message: 'Content must be at most 5000 characters' })
   content: string;
}

export class UpdateNewsDtoSW {
   @ApiPropertyOptional({
      example: 'Updated Title: Market Summary',
      description: 'Updated title of the news article',
      maxLength: 150,
   })
   @IsOptional()
   @IsString()
   @MaxLength(150, { message: 'Title must be at most 150 characters' })
   title?: string;

   @ApiPropertyOptional({
      example: 'The market saw a significant rise today with technology stocks...',
      description: 'Updated content of the news article',
      maxLength: 5000,
   })
   @IsOptional()
   @IsString()
   @MaxLength(5000, { message: 'Content must be at most 5000 characters' })
   content?: string;
}

export class NewsResponseDto {
   @ApiProperty({ example: 'Breaking News: Market Hits Record High' })
   title: string;

   @ApiProperty({ example: 'The stock market reached an all-time high today...' })
   content: string;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   createdAt: Date;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   updatedAt: Date;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000123' })
   _id: string;
}

export class GetAllNewsResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [NewsResponseDto] })
   data: NewsResponseDto[];
}
