import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create')
  async createAdmin(@Body() body: { username: string; password: string }) {
    return this.adminService.createAdmin(body.username, body.password);
  }

  @Post('login')
  @UseGuards()
  async login(@Body() body: { username: string; password: string }) {
    return this.adminService.loginAdmin(body.username, body.password);
  }
}
