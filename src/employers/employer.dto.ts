import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmployerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80, { message: 'First name must be at most 80 characters' })
  employer_first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80, { message: 'Last name must be at most 80 characters' })
  employer_last_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Position must be at most 100 characters' })
  employer_position: string;

  @IsString()
  @IsNotEmpty()
  employer_image: string;
}


export class UpdateEmployerDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  employer_first_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  employer_last_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  employer_position?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  employer_image?: string;
}
