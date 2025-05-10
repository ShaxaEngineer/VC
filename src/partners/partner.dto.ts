import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(80, { message: 'Name must be at most 80 characters' })
   partner_name: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Information must be at most 100 characters' })
   partner_information: string;

   @IsString()
   @IsNotEmpty()
   partner_image: string;
}


export class UpdatePartnerDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(80, { message: 'Name must be at most 80 characters' })
   partner_name: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100, { message: 'Information must be at most 100 characters' })
   partner_information: string;

   @IsString()
   @IsNotEmpty()
   partner_image: string;
}
