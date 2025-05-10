// src/letstalk/letstalk.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLetstalkDto {
   @ApiProperty({ example: 'Jane Smith', description: 'Full name of the user' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   letstalk_fullname: string;

   @ApiProperty({ example: 'jane@example.com', description: 'Email address' })
   @IsEmail()
   @IsNotEmpty()
   @MaxLength(100)
   letstalk_email: string;

   @ApiProperty({ example: 'I would like to talk about your services.', description: 'User message' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   letstalk_message: string;

   @ApiProperty({ example: '93 122 22 22', description: 'phone number' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   letstalk_number: string;
}
