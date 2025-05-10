// src/contact/dto/create-contact.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
   @ApiProperty({ example: 'John Doe', description: 'Full name of the contact' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   fullname: string;

   @ApiProperty({ example: 'john@example.com', description: 'Email address' })
   @IsEmail()
   @IsNotEmpty()
   @MaxLength(100)
   email: string;

   @ApiProperty({ example: 'Hello, I am interested in your services.', description: 'Message content' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   message: string;
}
