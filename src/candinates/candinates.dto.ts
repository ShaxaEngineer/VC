// src/admin/dto/create-candidate.dto.ts

import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCandinateDto {
   @ApiProperty({
      example: 'Alice Smith',
      description: 'Full name of the candidate',
      maxLength: 100,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   candinate_name: string;

   @ApiProperty({
      example: '+1234567890',
      description: 'Phone number of the candinate',
      maxLength: 20,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   candinate_number: string;

   @ApiProperty({
      example: 'alice@example.com',
      description: 'Email address of the candinate',
      maxLength: 100,
   })
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

   @ApiProperty({
      example: 'I am excited to apply for this position.',
      description: 'candinate’s message or cover letter',
      maxLength: 1000,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   candinate_message: string;

   @ApiProperty({
      example: '653bc7e9fc13ae3a5c000123',
      description: 'ID of the vacancy the candinate is applying to',
   })
   @IsString()
   @IsOptional()
   applied_vacancy_id?: string;
}
