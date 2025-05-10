import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateEmployerDtoSW {
   @ApiProperty({
      example: 'John',
      description: 'First name of the employer',
      maxLength: 80,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(80, { message: 'First name must be at most 80 characters' })
   employer_first_name: string;

   @ApiProperty({
      example: 'Doe',
      description: 'Last name of the employer',
      maxLength: 80,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(80, { message: 'Last name must be at most 80 characters' })
   employer_last_name: string;

   @ApiProperty({
      example: 'Chief Technology Officer',
      description: 'Position of the employer',
      maxLength: 100,
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Position must be at most 100 characters' })
   employer_position: string;

   @ApiProperty({
      type: 'string',
      format: 'binary',
      description: 'Image file of the employer',
   })
   @IsString()
   @IsNotEmpty()
   @MaxLength(255, { message: 'Image must be url .. filename must be at most 255 characters' })
   employer_image: string;
}


export class EmployerResponseDto {
   @ApiProperty({ example: 'John' })
   employer_first_name: string;

   @ApiProperty({ example: 'Doe' })
   employer_last_name: string;

   @ApiProperty({ example: 'CTO' })
   employer_position: string;

   @ApiProperty({ example: 'uuid-image-name.jpg' })
   employer_image: string;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   createdAt: Date;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   updatedAt: Date;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000004' })
   _id: string;
}



export class GetAllEmployersResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [EmployerResponseDto] })
   data: EmployerResponseDto[];
}


export class UpdateEmployerDtoSW {
   @ApiPropertyOptional({
      example: 'John',
      description: 'First name of the employer',
      maxLength: 80,
   })
   @IsString()
   @MaxLength(80, { message: 'First name must be at most 80 characters' })
   employer_first_name?: string;

   @ApiPropertyOptional({
      example: 'Doe',
      description: 'Last name of the employer',
      maxLength: 80,
   })
   @IsString()
   @MaxLength(80, { message: 'Last name must be at most 80 characters' })
   employer_last_name?: string;

   @ApiPropertyOptional({
      example: 'CTO',
      description: 'Position of the employer',
      maxLength: 100,
   })
   @IsString()
   @MaxLength(100, { message: 'Position must be at most 100 characters' })
   employer_position?: string;

   @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: 'Updated image file of the employer',
   })
   @IsString()
   @MaxLength(255, { message: 'Image filename must be at most 255 characters' })
   employer_image?: string;
}
