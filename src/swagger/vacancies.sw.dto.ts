import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, MaxLength, IsArray } from 'class-validator';

export class Vacancy {
   @Prop({ required: true })
   vacancy_name: string;

   @Prop({ required: true })
   vacancy_category: string;

   @Prop({ required: true })
   vacancy_image: string;

   @Prop({ type: [String], required: true })
   vacancy_positions: string[];
}


export class CreateVacancyDtoSW {
   @ApiProperty({ example: 'Frontend Developer', description: 'Name of the vacancy' })
   @IsString()
   @IsNotEmpty()
   vacancy_name: string;

   @ApiProperty({ example: 'IT', description: 'Category of the vacancy' })
   @IsString()
   @IsNotEmpty()
   vacancy_category: string;

   @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Vacancy image URL' })
   vacancy_image: string;

   @ApiProperty({ example: ['Junior', 'Senior'], description: 'List of available positions' })
   @IsArray()
   @IsString({ each: true })
   @IsNotEmpty()
   vacancy_positions: string[];
}

export class UpdateVacancyDtoSW {
   @ApiPropertyOptional({ example: 'Frontend Developer', description: 'Name of the vacancy' })
   @IsOptional()
   @IsString()
   vacancy_name?: string;

   @ApiPropertyOptional({ example: 'IT', description: 'Category of the vacancy' })
   @IsOptional()
   @IsString()
   vacancy_category?: string;

   @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Vacancy image URL' })
   @IsOptional()
   @IsString()
   vacancy_image?: string;

   @ApiPropertyOptional({ example: ['Junior', 'Senior'], description: 'List of available positions' })
   @IsOptional()
   @IsArray()
   @IsString({ each: true })
   vacancy_positions?: string[];
}


export class VacancyResponseDto {
   @ApiProperty({ example: 'Frontend Developer' })
   vacancy_name: string;

   @ApiProperty({ example: 'IT' })
   vacancy_category: string;

   @ApiProperty({ example: 'https://example.com/image.jpg' })
   vacancy_image: string;

   @ApiProperty({ example: ['Junior', 'Senior'] })
   vacancy_positions: string[];

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   createdAt: Date;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   updatedAt: Date;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000004' })
   _id: string;
}


export class GetAllVacanciesResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [VacancyResponseDto] })
   data: VacancyResponseDto[];
}
