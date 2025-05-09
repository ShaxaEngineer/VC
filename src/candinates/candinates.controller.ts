import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CandinatesService } from './candinates.service';
import { ImageService } from 'src/images/image.service';
import { CreateCandidateDtoSW, GetAllCandidatesResponseDto } from 'src/swagger/candinates.sw.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCandidateDto } from './candinates.dto';


@Controller('candinates')
@ApiTags('Candinates')
@ApiBearerAuth()
export class CandinatesController {
   constructor(
      private readonly candinatesService: CandinatesService,
      private readonly imageService: ImageService,
   ) { }


   @Get("")
   @ApiOperation({ summary: 'Get all candinates' })
   @ApiOkResponse({
      description: 'Returns all candinates',
      type: GetAllCandidatesResponseDto,
   })
   @ApiResponse({ status: 200, description: `{message:success, statusCode:200, data:{}}` })
   async getAll() {
      try {
         return this.candinatesService.findAll();
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create employer');
      }
   }


   
   @Post('create')
   @ApiOperation({ summary: 'Create a candinate' })
   @ApiConsumes('multipart/form-data')
   @ApiBody({ type: CreateCandidateDtoSW })
   @ApiResponse({ status: 201, description: `message: success, statusCode:201, data:{}` })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   @UseGuards(AdminGuard)
   @UseInterceptors(FileInterceptor('candinate_resume'))
   async create(@Body() CreateCandidateDto: CreateCandidateDto, @UploadedFile() candinate_resume: Express.Multer.File) {
      try {
         if (!candinate_resume) {
            throw new BadRequestException('candinate_resume file is required');
         }

         console.log(candinate_resume, 1111111111);
         return
         const candinateResume = await this.imageService.saveImage(candinate_resume);
         const employerData = { ...CreateCandidateDto, candinate_resume: candinateResume };
         return this.candinatesService.create(employerData);
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         }
         throw new BadRequestException('Failed to create employer');
      }
   }

}
