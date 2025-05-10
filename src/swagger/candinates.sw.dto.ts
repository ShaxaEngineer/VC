// Fix your import at the top
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { Candinate } from 'src/models/candinates.schema';

export class CreateCandinateDtoSW {
   @ApiProperty({ example: 'Alice Smith', description: 'Full name of the candinate', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_name: string;

   @ApiProperty({ example: 'Manager', description: 'Postion of the candinate ', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_postion: string;

   @ApiProperty({ example: '+1234567890', description: 'Phone number', maxLength: 20 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   candinate_number: string;

   @ApiProperty({ example: 'alice@example.com', description: 'Email address', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_email: string;

   @ApiProperty({ example: 'true or false', description: 'candinate is eligibl to work in UK', maxLength: 100 })
   @IsBoolean()
   @IsNotEmpty()
   candinate_eligibl_uk: boolean;

   @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Resume file, file you have to sent URL of file which backend returend' })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candinate_resume?: string;

   @ApiProperty({ example: 'I am excited to apply...', description: 'Cover letter', maxLength: 1000 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   candinate_message: string;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000123', description: 'Vacancy ID' })
   @IsString()
   @IsOptional()
   applied_vacancy_id?: string;
}
export class CandinateResponseDto {
   @ApiProperty({ example: 'Alice Smith', description: 'Full name of the candinate', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_name: string;

   @ApiProperty({ example: '+1234567890', description: 'Phone number of the candinate', maxLength: 20 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   candinate_number: string;


   @ApiProperty({ example: 'Manager', description: 'Postion of the candinate ', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_postion: string;

   @ApiProperty({ example: 'true or false', description: 'candinate is eligibl to work in UK', maxLength: 100 })
   @IsBoolean()
   @IsNotEmpty()
   candinate_eligibl_uk: boolean;

   @ApiProperty({ example: 'alice@example.com', description: 'Email address of the candinate', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_email: string;

   @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: 'Resume file uploaded by the candinate',
   })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candinate_resume?: string;

   @ApiProperty({ example: 'I am excited to apply...', description: 'Candidate’s message or cover letter', maxLength: 1000 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   candinate_message: string;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000123', description: 'ID of the vacancy the candinate is applying to' })
   @IsString()
   @IsOptional()
   applied_vacancy_id?: string;
}

export class CandinateResponseSingleDto {
   @ApiProperty({ description: 'Response message indicating the success of the operation', example: 'success' })
   message: string;

   @ApiProperty({ description: 'HTTP status code of the response', example: 200 })
   statusCode: number;

   @ApiProperty({ description: 'Data for the candidates including pagination details' })
   data: CandinateResponseDto;
}



export class PaginatedCandinatesDto {
   @ApiProperty({ description: 'Total number of candidates in the database', example: 100 })
   totalItems: number;

   @ApiProperty({ description: 'Total number of pages for pagination', example: 10 })
   totalPages: number;

   @ApiProperty({ description: 'Current page of the paginated result', example: 1 })
   currentPage: number;
}

export class GetAllCandinatesResponseDto {
   @ApiProperty({ description: 'Response message indicating the success of the operation', example: 'success' })
   message: string;

   @ApiProperty({ description: 'HTTP status code of the response', example: 200 })
   statusCode: number;

   @ApiProperty({ description: 'Data for the candidates including pagination details', type: CandinateResponseDto })
   data: CandinateResponseDto[];


   @ApiProperty({ type: PaginatedCandinatesDto, description: 'Pagination metadata' })
   meta: PaginatedCandinatesDto;
}


export class UpdateCandinateDtoSW {
   @ApiPropertyOptional({ example: 'Alice Smith', maxLength: 100 })
   @IsOptional()
   @IsString()
   @MaxLength(100)
   candinate_name?: string;


   @ApiPropertyOptional({ example: 'Manager', maxLength: 100 })
   @IsOptional()
   @IsString()
   @MaxLength(100)
   candinate_position?: string;

   @ApiPropertyOptional({ example: '+1234567890', maxLength: 20 })
   @IsOptional()
   @IsString()
   @MaxLength(20)
   candinate_number?: string;

   @ApiPropertyOptional({ example: 'alice@example.com', maxLength: 100 })
   @IsOptional()
   @IsString()
   @MaxLength(100)
   candinate_email?: string;


   @ApiProperty({ example: 'true or false', description: 'candinate is eligibl to work in UK', maxLength: 100 })
   @IsBoolean()
   @IsNotEmpty()
   candinate_eligibl_uk: boolean;

   @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Updated resume' })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candinate_resume?: string;

   @ApiPropertyOptional({ example: 'Updated cover letter', maxLength: 1000 })
   @IsOptional()
   @IsString()
   @MaxLength(1000)
   candinate_message?: string;

   @ApiPropertyOptional({ example: '653bc7e9fc13ae3a5c000123' })
   @IsOptional()
   @IsString()
   applied_vacancy_id?: string;
}

