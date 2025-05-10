import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, ArrayNotEmpty, MaxLength } from 'class-validator';


export class CreateVacancyDto {
   @IsNotEmpty()
   @IsString()
   @MaxLength(255, { message: 'text most 255 characters' })
   vacancy_name: string;

   @IsString()
   @IsNotEmpty()
   vacancy_image: string;

   @IsNotEmpty()
   @IsString()
   @MaxLength(255, { message: 'text most 255 characters' })
   vacancy_category: string;

   @IsNotEmpty()
   @IsArray()
   @ArrayNotEmpty()
   @IsString({ each: true })
   vacancy_positions: string[];
}



export class UpdateVacancyDto {
   @IsOptional()
   @MaxLength(255, { message: 'text most 255 characters' })
   @IsString()
   vacancy_name?: string;


   @IsOptional()
   @IsString()
   vacancy_image?: string;

   @IsOptional()
   @MaxLength(255, { message: 'text most 255 characters' })
   @IsString()
   vacancy_category?: string;

   @IsOptional()
   @IsArray()
   @IsString({ each: true })
   vacancy_positions?: string[];
}
