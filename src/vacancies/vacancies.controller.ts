// src/vacancies/vacancies.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { AdminGuard } from '../auth/admin.guard';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreateVacancyDtoSW, GetAllVacanciesResponseDto, UpdateVacancyDtoSW } from 'src/swagger/vacancies.sw.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/images/image.service';


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
  @ApiResponse({ status: 200, description: 'Returns all vacancies', type: GetAllVacanciesResponseDto })
  async findAll() {
    try {
      return this.vacanciesService.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to get vacancies');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  @ApiResponse({ status: 200, description: 'Returns one vacancy', type: GetAllVacanciesResponseDto })
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
      if (!vacancy_image) {
        throw new BadRequestException('vacancy_image file is required');
      }
      const imageName = await this.imageService.saveImage(vacancy_image);
      const vacancyData = { ...CreateVacancyDto, vacancy_image: imageName };
      return this.vacanciesService.create(vacancyData);
    } catch {
      throw new BadRequestException('Failed to create vacancy');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update vacancy' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Return vacancy which updated, even you can update only name or positon or image I mean you just sent udated key to backend',
    type: GetAllVacanciesResponseDto,
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
      throw new BadRequestException('Failed to update employer');
    }
  }


  @Delete(':id')
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
