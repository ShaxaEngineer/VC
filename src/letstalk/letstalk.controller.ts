// src/letstalk/letstalk.controller.ts
import {
   Controller,
   Post,
   Body,
   Get,
   Query,
   Delete,
   Param,
   UseGuards,
} from '@nestjs/common';
import {
   ApiBearerAuth,
   ApiBody,
   ApiOperation,
   ApiResponse,
   ApiTags,
} from '@nestjs/swagger';
import { LetstalkService } from './letstalk.service';
import { CreateLetstalkDto } from './letstalk.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('letstalk')
@ApiTags('Letstalk')
export class LetstalkController {
   constructor(private readonly letstalkService: LetstalkService) { }

   @Post('create')
   @ApiOperation({ summary: 'Create a Letstalk message' })
   @ApiBody({ type: CreateLetstalkDto })
   @ApiResponse({ status: 201, description: 'Created successfully' })
   @ApiResponse({ status: 400, description: 'Validation failed' })
   async create(@Body() dto: CreateLetstalkDto) {
      return this.letstalkService.create(dto);
   }

   @Get()
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Get all Letstalk messages with pagination (Admin only)' })
   @ApiResponse({ status: 200, description: 'Fetched successfully' })
   async getAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
   ) {
      return this.letstalkService.getAll(Number(page), Number(limit));
   }

   @Delete(':id')
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Delete Letstalk message by ID (Admin only)' })
   @ApiResponse({ status: 200, description: 'Deleted successfully' })
   @ApiResponse({ status: 404, description: 'Not Found' })
   async delete(@Param('id') id: string) {
      return this.letstalkService.remove(id);
   }
}
