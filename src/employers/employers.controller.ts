import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, BadRequestException, Put, Param, Delete, Get, NotFoundException, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployersService } from './employers.service';
import { AdminGuard } from '../auth/admin.guard';
import { CreateEmployerDto, UpdateEmployerDto } from './employer.dto';
import { ImageService } from '../images/image.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployerDtoSW, GetAllEmployersResponseDto, UpdateEmployerDtoSW } from 'src/swagger/employers.sw.dto';


@ApiTags('Employers')
@ApiBearerAuth()
@Controller('employers')
export class EmployersController {
   constructor(
      private readonly employersService: EmployersService,
      private readonly imageService: ImageService,
   ) { }

   @Get("")
   @ApiOperation({ summary: 'Get all employers' })
   @ApiOkResponse({
      description: 'Returns all employers',
      type: GetAllEmployersResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   async getAll() {
      try {
         const response = await this.employersService.findAll();
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create employer');
      }
   }


   @Get(":id")
   @ApiParam({ name: 'id', required: true, description: 'Employer ID' })
   @ApiOperation({ summary: 'Get employer by ID' })
   @ApiOkResponse({
      description: 'Returns one employer',
      type: GetAllEmployersResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   @ApiResponse({ status: 404, description: 'Employer not found' })
   async getByfindOne(@Param('id') id: string) {
      try {
         const response = await this.employersService.findOne(id);
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create employer');
      }
   }

   @Post('create')
   @ApiOperation({ summary: 'Create a new employer' })
   @ApiBody({ type: CreateEmployerDtoSW })
   @ApiResponse({ status: 201, description: `message: success, statusCode:201, data:{}` })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   @UseGuards(AdminGuard)
   async create(@Body() createEmployerDto: CreateEmployerDto) {
      try {
         return this.employersService.create(createEmployerDto);
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create employer');
      }
   }

   @Put(':id')
   @ApiParam({ name: 'id', required: true, description: 'Employer ID' })
   @ApiOperation({ summary: 'Update employer' })
   @ApiOkResponse({
      description: 'Updated employer',
      type: GetAllEmployersResponseDto,
   })
   @ApiBody({ type: UpdateEmployerDtoSW })
   @ApiResponse({ status: 200, description: 'message: "success", statusCode:200, data:{}' })
   @ApiResponse({ status: 404, description: 'Employer not found' })
   @UseGuards(AdminGuard)
   async update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
      try {
         return this.employersService.update(id, updateEmployerDto);
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new BadRequestException('Failed to delete employer');
      }
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Delete employer' })
   @ApiResponse({ status: 200, description: 'message: "success", statusCode:204, data:"Employer with ID 681f9a39458a3c545a17b85e deleted successfully."' })
   @ApiResponse({ status: 404, description: 'Employer not found' })
   @UseGuards(AdminGuard)
   async delete(@Param('id') id: string) {
      try {
         const employer = await this.employersService.findOne(id);
         if (!employer || !employer.data) {
            throw new NotFoundException(`Employer with ID ${id} not found`);
         }
         await this.imageService.deleteImage(employer.data.employer_image);
         await this.employersService.remove(id);
         return {
            message: 'success',
            statusCode: 200,
            data: `Employer with ID ${id} deleted successfully.`,
         };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new BadRequestException('Failed to delete employer');
      }
   }
}
