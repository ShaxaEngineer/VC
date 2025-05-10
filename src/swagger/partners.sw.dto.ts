import { ApiProperty } from "@nestjs/swagger";



export class ParnersResponseDto {
   @ApiProperty({ example: 'Google' })
   partner_name: string;

   @ApiProperty({ example: 'About company' })
   partner_information: string;

   @ApiProperty({ example: 'uuid-image-name.jpg' })
   partner_image: string;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   createdAt: Date;

   @ApiProperty({ example: '2024-08-20T10:00:00.000Z' })
   updatedAt: Date;

   @ApiProperty({ example: '653bc7e9fc13ae3a5c000004' })
   _id: string;
}

export class GetAllPartnersResponseDto {
   @ApiProperty({ example: 'success' })
   message: string;

   @ApiProperty({ example: 200 })
   statusCode: number;

   @ApiProperty({ type: [ParnersResponseDto] })
   data: ParnersResponseDto[];
}
