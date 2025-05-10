import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

// CreatePartnerDto - For creating a partner
export class CreatePartnerDtoSW {
   @ApiProperty({
      example: 'Partner A',
      description: 'Name of the partner',
      maxLength: 80,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(80, { message: 'Partner name must be at most 80 characters' })
   partner_name: string;

   @ApiProperty({
      example: 'Global leader in tech solutions.',
      description: 'Information about the partner',
      maxLength: 100,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Partner information must be at most 100 characters' })
   partner_information: string;

   @ApiProperty({
      type: 'string',
      format: 'binary',
      description: 'Image file of the partner',
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(255, { message: 'Image filename must be at most 255 characters' })
   partner_image: string;
}

// PartnerResponseDto - For returning partner details in response
export class PartnerResponseDto {
   @ApiProperty({ example: 'Partner A' })
   partner_name: string;

   @ApiProperty({ example: 'Global leader in tech solutions.' })
   partner_information: string;

   @ApiProperty({ example: 'partner-image.jpg' })
   partner_image: string;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   createdAt: Date;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   updatedAt: Date;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000004' })
   _id: string;
}

// GetAllPartnersResponseDto - For returning all partners in a paginated response
export class GetAllPartnersResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [PartnerResponseDto] })
   data: PartnerResponseDto[];

   @ApiProperty({ example: 1 })
   currentPage: number;

   @ApiProperty({ example: 10 })
   pageSize: number;

   @ApiProperty({ example: 100 })
   total: number;

   @ApiProperty({ example: 10 })
   totalPages: number;
}


export class GetSinglePartnersResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [PartnerResponseDto] })
   data: PartnerResponseDto;
}

// UpdatePartnerDtoSW - For updating a partner's information
export class UpdatePartnerDtoSW {
   @ApiPropertyOptional({
      example: 'Partner A Updated',
      description: 'Name of the partner',
      maxLength: 80,
   })
   @IsString()
   @MaxLength(80, { message: 'Partner name must be at most 80 characters' })
   partner_name?: string;

   @ApiPropertyOptional({
      example: 'Leader in cutting-edge tech solutions.',
      description: 'Information about the partner',
      maxLength: 100,
   })
   @IsString()
   @MaxLength(100, { message: 'Partner information must be at most 100 characters' })
   partner_information?: string;

   @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: 'Updated image file of the partner',
   })
   @IsString()
   @MaxLength(255, { message: 'Image filename must be at most 255 characters' })
   partner_image?: string;
}
