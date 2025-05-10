import {
   BadRequestException,
   Controller,
   Get,
   Post,
   Patch,
   Delete,
   Param,
   Query,
   Body,
   Put,
   UseGuards,
} from '@nestjs/common';
import { PartnerService } from './partners.service';
import { ImageService } from 'src/images/image.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
   UpdatePartnerDtoSW,
   CreatePartnerDtoSW,
   PartnerResponseDto,
   GetAllPartnersResponseDto,
   GetSinglePartnersResponseDto
} from '../swagger/partners.dto'; // Import the SWDTOs
import { UpdatePartnerDto } from './partner.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('partners')
@ApiTags('Partners')
@ApiBearerAuth()
export class PartnersController {
   constructor(
      private readonly partnerService: PartnerService,
      private readonly imageService: ImageService,
   ) { }

   @Get()
   @ApiOperation({ summary: 'Get all partners (with pagination)' })
   @ApiOkResponse({
      description: 'Returns all employers',
      type: GetAllPartnersResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   async getAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10
   ): Promise<GetAllPartnersResponseDto> { // Update return type to match the SWDTO
      try {
         const response = await this.partnerService.findAll(Number(page), Number(limit));
         return response; // Assuming partnerService.findAll returns the correct response type
      } catch (error) {
         throw new BadRequestException('Failed to get partners');
      }
   }

   @Post()
   @ApiOperation({ summary: 'Create a new employer' })
   @ApiBody({ type: CreatePartnerDtoSW })
   @ApiResponse({ status: 201, description: `message: success, statusCode:201, data:{}`, type: GetAllPartnersResponseDto })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Create a new partner' })
   async create(@Body() createPartnerDto: CreatePartnerDtoSW): Promise<PartnerResponseDto> { // Update the type for body
      return this.partnerService.create(createPartnerDto);
   }

   @Get(':id')
   @ApiParam({ name: 'id', required: true, description: 'Partner ID' })
   @ApiOperation({ summary: 'Get partner by ID' })
   @ApiOkResponse({
      description: 'Returns one partner',
      type: GetSinglePartnersResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   @ApiResponse({ status: 404, description: 'Partner not found' })
   @ApiOperation({ summary: 'Get partner by ID' })
   async getOne(@Param('id') id: string): Promise<PartnerResponseDto> { // Return PartnerResponseDto for single partner
      return this.partnerService.findOne(id);
   }

   @Put(':id')
   @ApiParam({ name: 'id', required: true, description: 'Partner ID' })
   @ApiOkResponse({
      description: 'Updated Partner',
      type: GetSinglePartnersResponseDto,
   })
   @ApiBody({ type: UpdatePartnerDtoSW })
   @ApiResponse({ status: 200, description: 'message: "success", statusCode:200, data:{}' })
   @ApiResponse({ status: 404, description: 'Partner not found' })
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Update partner by ID' })
   async update(
      @Param('id') id: string,
      @Body() updatePartnerDto: UpdatePartnerDto
   ): Promise<PartnerResponseDto> { // Use UpdatePartnerDtoSW and return PartnerResponseDto
      return this.partnerService.update(id, updatePartnerDto);
   }

   @Delete(':id')
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Delete partner by ID' })
   async remove(@Param('id') id: string): Promise<{ message: string, statusCode: number }> { // Assuming response contains status and message
      return this.partnerService.remove(id);
   }
}
