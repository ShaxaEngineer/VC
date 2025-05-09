import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, BadRequestException, Put, Param, Delete, Get, } from '@nestjs/common';
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
   @ApiConsumes('multipart/form-data')
   @ApiBody({ type: CreateEmployerDtoSW })
   @ApiResponse({ status: 201, description: `message: success, statusCode:201, data:{}` })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   @UseGuards(AdminGuard)
   @UseInterceptors(FileInterceptor('employer_image'))
   async create(@Body() createEmployerDto: CreateEmployerDto, @UploadedFile() employer_image: Express.Multer.File) {
      try {
         if (!employer_image) {
            throw new BadRequestException('employer_image file is required');
         }

         const imageName = await this.imageService.saveImage(employer_image);
         const employerData = { ...createEmployerDto, employer_image: imageName };
         return this.employersService.create(employerData);
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
   @ApiConsumes('multipart/form-data')
   @ApiOkResponse({
      description: 'Returns employer which updated, even you can update only firstname or lastname or image I mean you just sent udated key to backend',
      type: GetAllEmployersResponseDto,
   })
   @ApiBody({ type: UpdateEmployerDtoSW })
   @ApiResponse({ status: 200, description: 'message: "success", statusCode:200, data:{}' })
   @ApiResponse({ status: 404, description: 'Employer not found' })
   @UseGuards(AdminGuard)
   @UseInterceptors(FileInterceptor('employer_image'))
   async update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto, @UploadedFile() employer_image?: Express.Multer.File) {
      try {
         const employer = await this.employersService.findOne(id);

         if (employer_image) {
            if (employer.data.employer_image) {
               await this.imageService.deleteImage(employer.data.employer_image);
            }
            const imageName = await this.imageService.saveImage(employer_image);
            updateEmployerDto.employer_image = imageName;
         }

         return this.employersService.update(id, updateEmployerDto);
      } catch (error) {
         throw new BadRequestException('Failed to update employer');
      }
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Delete employer' })
   @ApiResponse({ status: 200, description: 'message: "success", statusCode:204, data:{}' })
   @ApiResponse({ status: 404, description: 'Employer not found' })
   @UseGuards(AdminGuard)
   async delete(@Param('id') id: string) {
      try {
         const employer = await this.employersService.findOne(id);

         if (employer.data.employer_image) {
            await this.imageService.deleteImage(employer.data.employer_image);
         }

         const deletedEmployer = await this.employersService.remove(id);

         return {
            message: 'success',
            statusCode: 200,
            data: `Employer with ID ${id} deleted successfully.`,
         };
      } catch (error) {
         throw new BadRequestException('Failed to delete employer');
      }
   }
}
