import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CandinatesService } from './candinates.service';
import { ImageService } from 'src/images/image.service';
import { CandinateResponseDto, CandinateResponseSingleDto, CreateCandinateDtoSW, GetAllCandinatesResponseDto } from 'src/swagger/candinates.sw.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCandinateDto } from './candinates.dto';
import { Query } from '@nestjs/common';
import { Candinate } from 'src/models/candinates.schema';


@Controller('candinates')
@ApiTags('Candinates')
@ApiBearerAuth()
export class CandinatesController {
   constructor(
      private readonly candinatesService: CandinatesService,
      private readonly imageService: ImageService,
   ) { }


   @Get('/filter:id')
   @ApiOperation({ summary: 'Get all candidates by vacancy ID' })
   @ApiParam({ name: 'id', required: true, description: 'Vacancy ID' })
   @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
   @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
   @ApiOkResponse({
      description: 'Returns paginated candidates who applied for the vacancy',
      type: GetAllCandinatesResponseDto,
   })
   async getCandidatesByVacancy(
      @Param('id') id: string,
      @Query('page') page = 1,
      @Query('limit') limit = 10,
   ) {
      try {
         return await this.candinatesService.findAllByVacancyId(id, +page, +limit);
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to fetch candidates');
      }
   }



   @Get("")
   @ApiOperation({ summary: 'Get all candinates' })
   @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
   @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
   @ApiOkResponse({
      description: 'Returns paginated candidates',
      type: GetAllCandinatesResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   async getAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
   ) {
      try {
         return this.candinatesService.findAll(+page, +limit);
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to fetch candidates');
      }
   }

   @Get(':id')
   @ApiParam({ name: 'id', required: true, description: 'Candinate ID' })
   @ApiOperation({ summary: 'Get a single candidate by ID' })
   @ApiResponse({
      status: 200,
      description: 'Returns a single candidate',
      type: CandinateResponseSingleDto,
   })
   @ApiResponse({
      status: 404,
      description: 'Candidate not found',
   })
   async getOne(@Param('id') id: string) {
      try {
         return this.candinatesService.findOne(id);
      } catch (error) {
         throw error;
      }
   }

   @Post('create')
   @ApiOperation({ summary: 'Create a candinate' })
   @ApiBody({ type: CreateCandinateDtoSW })
   @ApiResponse({
      status: 201,
      description: 'message: success, statusCode:201, data:{}',
      type: CandinateResponseSingleDto,
   })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   async create(@Body() CreateCandinateDto: CreateCandinateDto) {
      try {
         return this.candinatesService.create(CreateCandinateDto);
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create candinate');
      }
   }

}
