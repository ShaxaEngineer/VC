import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDtoSW } from 'src/swagger/admin.sw.dto';

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDtoSW })
  @ApiResponse({ status: 201, description: `statusCode:201, access_token:token ` })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('create')
  async createAdmin(@Body() body: { username: string; password: string }) {
    return this.adminService.createAdmin(body.username, body.password);
  }


  @ApiOperation({ summary: 'Login as  admin' })
  @ApiBody({ type: CreateAdminDtoSW })
  @ApiResponse({ status: 201, description: `statusCode:201, access_token:token ` })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.adminService.loginAdmin(body.username, body.password);
  }
}
