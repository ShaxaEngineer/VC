import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from '../models/admin.schema';


@Injectable()
export class AdminService {
   constructor(
      @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
      private readonly jwtService: JwtService

   ) { }

   async createAdmin(username: string, password: string): Promise<{ access_token: string }> {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new this.adminModel({ username, password: hashedPassword });
      await admin.save();

      const payload = { username: admin.username, sub: admin._id, role: 'admin' };
      const access_token = this.jwtService.sign(payload);

      return { access_token };
   }

   async loginAdmin(username: string, password: string): Promise<any> {
      const admin = await this.adminModel.findOne({ username });

      if (!admin) {
         throw new NotFoundException('Admin not found');

      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
         throw new UnauthorizedException('Invalid password');

      }

      const payload = { username: admin.username, sub: admin._id, role: 'admin' };

      const token = this.jwtService.sign(payload);

      return {
         statusCode: 200,
         message: 'Login successful',
         token
      };
   }
}
