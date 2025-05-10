// Fix your import at the top
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateContactDtoSW {
   @ApiProperty({ example: 'Jon Jones', description: 'fullname', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   contact_fullname: string;

   @ApiProperty({ example: 'jone20@gmail.com', description: 'email', maxLength: 20 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   contact_email: string;


   @ApiProperty({ example: 'Hey I wanna contact with you', description: 'contact' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(555)
   contact_message: string;
}
class MetaDto {
   @ApiProperty({ example: 22, description: 'Total number of items' })
   totalItems: number;

   @ApiProperty({ example: 1, description: 'Current page number' })
   page: number;

   @ApiProperty({ example: 10, description: 'Number of items per page' })
   limit: number;

   @ApiProperty({ example: 3, description: 'Total number of pages' })
   totalPages: number;
}

export class ResponseContactDtoSW {
   @ApiProperty({ description: 'Response message indicating the success of the operation', example: 'success' })
   message: string;

   @ApiProperty({ description: 'HTTP status code of the response', example: 200 })
   statusCode: number;


   @ApiProperty({ description: 'Data for the contact' })
   data: CreateContactDtoSW;

   @ApiProperty({ type: MetaDto, description: 'Pagination metadata' })
   meta: MetaDto;
}


