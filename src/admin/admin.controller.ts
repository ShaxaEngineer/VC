import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAdminDtoSW } from 'src/swagger/admin.sw.dto';

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDtoSW })
  @ApiResponse({ status: 201, description: `statusCode:201, access_token:token` })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('create')
  async createAdmin(@Body() body: { username: string; password: string }) {
    return this.adminService.createAdmin(body.username, body.password);
  }

  @ApiOperation({ summary: 'Login as admin' })
  @ApiBody({ type: CreateAdminDtoSW })
  @ApiResponse({ status: 200, description: `statusCode:200, access_token:token` })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.adminService.loginAdmin(body.username, body.password);
  }

  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiBody({ type: CreateAdminDtoSW })
  @ApiResponse({ status: 200, description: 'Admin updated successfully' })
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() body: { username?: string; password?: string },
  ) {
    return this.adminService.updateAdmin(id, body.username, body.password);
  }

  // @ApiOperation({ summary: 'Delete admin by ID' })
  // @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  // @Delete(':id')
  // async deleteAdmin(@Param('id') id: string) {
  //   return this.adminService.deleteAdmin(id);
  // }
}
