import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employer, EmployerDocument } from '../models/emplyers.schema';

@Injectable()
export class EmployersService {
   constructor(
      @InjectModel(Employer.name) private readonly employerModel: Model<EmployerDocument>,
   ) { }

   async create(createEmployerDto: any): Promise<any> {
      try {
         const createdEmployer = new this.employerModel(createEmployerDto);
         const response = await createdEmployer.save();
         return { message: 'success', statusCode: 201, data: response };
      } catch (error) {
         throw new BadRequestException('Failed to create employer');
      }
   }

   async findAll(): Promise<any> {
      try {
         const response = await this.employerModel.find().exec();
         return { message: 'success', statusCode: 200, data: response };
      } catch (error) {
         throw new InternalServerErrorException('Failed to fetch employers');
      }
   }

   async findOne(id: string): Promise<any> {
      try {
         const employer = await this.employerModel.findById(id).exec();
         if (!employer) {
            throw new NotFoundException(`Employer with ID ${id} not found`);
         }
         return { message: 'success', statusCode: 200, data: employer };
      } catch (error) {
         throw new BadRequestException('Failed to fetch employer');
      }
   }

   async update(id: string, updateEmployerDto: any): Promise<any> {
      try {
         const employerDoc = await this.employerModel.findById(id).exec();
         if (!employerDoc) {
            throw new NotFoundException(`Employer with ID ${id} not found`);
         }

         Object.assign(employerDoc, updateEmployerDto);

         const updated = await employerDoc.save();

         return { message: 'success', statusCode: 200, data: updated };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new BadRequestException('Failed to update employer');
      }
   }

   async remove(id: string): Promise<any> {
      try {
         const employerDoc = await this.employerModel.findById(id).exec();
         if (!employerDoc) {
            throw new NotFoundException(`Employer with ID ${id} not found`);
         }

         await employerDoc.deleteOne();
         return { message: 'success', statusCode: 200, data: `Employer ${id} deleted` };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new InternalServerErrorException('Failed to delete employer');
      }
   }
}
