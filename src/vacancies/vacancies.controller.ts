// src/vacancies/vacancies.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { AdminGuard } from '../auth/admin.guard';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateVacancyDtoSW, GetAllVacanciesResponseDto, UpdateVacancyDtoSW, VacancyResponseDto } from 'src/swagger/vacancies.sw.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/images/image.service';
import { Query } from '@nestjs/common';


@ApiTags('Vacancies')
@ApiBearerAuth()
@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly imageService: ImageService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiOkResponse({
    description: 'Returns paginated vacancies',
    type: GetAllVacanciesResponseDto,
  })
  @ApiResponse({ status: 200, description: 'Returns all vacancies', type: GetAllVacanciesResponseDto })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10,) {
    try {
      return this.vacanciesService.findAll(page, limit);
    } catch (error) {
      throw new BadRequestException('Failed to get vacancies');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Vacancy ID' })
  @ApiOperation({ summary: 'Get vacancy by ID' })
  @ApiResponse({ status: 200, description: 'Returns one vacancy', type: VacancyResponseDto })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  async findOne(@Param('id') id: string) {
    try {
      return this.vacanciesService.findOne(id);
    } catch {
      throw new BadRequestException('Failed to get vacancy');
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new Vacancy' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateVacancyDtoSW })
  @ApiResponse({ status: 201, description: `message: success, statusCode:201, data:{}` })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('vacancy_image'))
  async create(@Body() CreateVacancyDto: CreateVacancyDto, @UploadedFile() vacancy_image: Express.Multer.File) {
    try {
      console.log(vacancy_image, 111);

      if (!vacancy_image) {
        const error = new BadRequestException('vacancy_image file is required');
        throw error;
      }
      const imageName = await this.imageService.saveImage(vacancy_image);
      const vacancyData = { ...CreateVacancyDto, vacancy_image: imageName };
      return this.vacanciesService.create(vacancyData);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create vacancy');
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, description: 'Vacancy ID' })
  @ApiOperation({ summary: 'Update vacancy' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Return vacancy which updated, even you can update only name or positon or image I mean you just sent udated key to backend',
    type: VacancyResponseDto,
  })
  @ApiBody({ type: UpdateVacancyDtoSW })
  @ApiResponse({ status: 200, description: 'message: "success", statusCode:200, data:{}' })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('vacancy_image'))
  async update(@Param('id') id: string, @Body() UpdateVacancyDto: UpdateVacancyDto, @UploadedFile() vacancy_image?: Express.Multer.File) {
    try {
      const vacancy = await this.vacanciesService.findOne(id);

      if (vacancy_image) {
        if (vacancy.data.vacancy_image) {
          await this.imageService.deleteImage(vacancy.data.vacancy_image);
        }
        const imageName = await this.imageService.saveImage(vacancy_image);
        UpdateVacancyDto.vacancy_image = imageName;
      }

      return this.vacanciesService.update(id, UpdateVacancyDto);
    } catch (error) {
      throw new BadRequestException('Failed to update vacancy');
    }
  }


  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Vacancy ID' })
  @ApiOperation({ summary: 'Delete vacancy' })
  @ApiResponse({ status: 200, description: 'message: "success", statusCode:204, data:{}' })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    try {
      const vacancy = await this.vacanciesService.findOne(id);

      if (vacancy.data.vacancy_image) {
        await this.imageService.deleteImage(vacancy.data.vacancy_image);
      }
      const deletedVacancy = await this.vacanciesService.remove(id);
      return {
        message: 'success',
        statusCode: 200,
        data: `vacancy with ID ${id} deleted successfully.`,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete vacancy');
    }
  }
}
