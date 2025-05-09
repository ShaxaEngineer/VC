// Fix your import at the top
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAdminDtoSW {
   @ApiProperty({ example: 'admin1', description: 'username of admin', maxLength: 100 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   username: string;

   @ApiProperty({ example: 'adminpassword', description: 'password of admin', maxLength: 20 })
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   password: string;
}

