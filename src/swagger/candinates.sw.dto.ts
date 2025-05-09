// Fix your import at the top
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCandidateDtoSW {
   @ApiProperty({ example: 'Alice Smith', description: 'Full name of the candidate', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candidate_name: string;

   @ApiProperty({ example: '+1234567890', description: 'Phone number', maxLength: 20 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   candidate_number: string;

   @ApiProperty({ example: 'alice@example.com', description: 'Email address', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candidate_email: string;

   @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Resume file' })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candidate_resume?: string;

   @ApiProperty({ example: 'I am excited to apply...', description: 'Cover letter', maxLength: 1000 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   candidate_message: string;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000123', description: 'Vacancy ID' })
   @IsString()
   @IsOptional()
   applied_vacancy_id?: string;
}


export class GetAllCandidatesResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   // @ApiProperty({ type: [CandidateResponseDto] })
   data: CandidateResponseDto[];
}


export class CandidateResponseDto {
   @ApiProperty({
      example: 'Alice Smith',
      description: 'Full name of the candidate',
      maxLength: 100,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candidate_name: string;

   @ApiProperty({
      example: '+1234567890',
      description: 'Phone number of the candidate',
      maxLength: 20,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   candidate_number: string;

   @ApiProperty({
      example: 'alice@example.com',
      description: 'Email address of the candidate',
      maxLength: 100,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candidate_email: string;

   @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: 'Resume file uploaded by the candidate',
   })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candidate_resume?: string;

   @ApiProperty({
      example: 'I am excited to apply for this position.',
      description: 'Candidate’s message or cover letter',
      maxLength: 1000,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   candidate_message: string;

   @ApiProperty({
      example: '653bc7e9fc13ae3a5c000123',
      description: 'ID of the vacancy the candidate is applying to',
   })
   @IsString()
   @IsOptional()
   applied_vacancy_id?: string;
}



export class UpdateCandidateDtoSW {
   @ApiPropertyOptional({ example: 'Alice Smith', maxLength: 100 })
   @IsOptional()
   @IsString()
   @MaxLength(100)
   candidate_name?: string;

   @ApiPropertyOptional({ example: '+1234567890', maxLength: 20 })
   @IsOptional()
   @IsString()
   @MaxLength(20)
   candidate_number?: string;

   @ApiPropertyOptional({ example: 'alice@example.com', maxLength: 100 })
   @IsOptional()
   @IsString()
   @MaxLength(100)
   candidate_email?: string;

   @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Updated resume' })
   @IsOptional()
   @IsString()
   @MaxLength(255)
   candidate_resume?: string;

   @ApiPropertyOptional({ example: 'Updated cover letter', maxLength: 1000 })
   @IsOptional()
   @IsString()
   @MaxLength(1000)
   candidate_message?: string;

   @ApiPropertyOptional({ example: '653bc7e9fc13ae3a5c000123' })
   @IsOptional()
   @IsString()
   applied_vacancy_id?: string;
}

