import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy, VacancyDocument } from '../models/vacancies.schema';

@Injectable()
export class VacanciesService {
   constructor(
      @InjectModel(Vacancy.name) private readonly vacancyModel: Model<VacancyDocument>,
   ) { }

   async create(createVacancyDto: any): Promise<any> {
      try {
         const createdVacancy = new this.vacancyModel(createVacancyDto);
         const response = await createdVacancy.save();
         return { message: 'success', statusCode: 201, data: response };
      } catch (error) {
         throw new BadRequestException('Failed to create vacancy');
      }
   }

   async findAll(page, limit): Promise<any> {
      try {
         const skip = (page - 1) * limit;

         const [data, total] = await Promise.all([
            this.vacancyModel.find().skip(skip).limit(limit).exec(),
            this.vacancyModel.countDocuments(),
         ]);

         return {
            message: 'success',
            statusCode: 200,
            data,
            meta: {
               total,
               page,
               limit,
               totalPages: Math.ceil(total / limit),
            },
         };

      } catch (error) {
         throw new InternalServerErrorException('Failed to fetch vacancies');
      }
   }

   async findOne(id: string): Promise<any> {
      try {
         const vacancy = await this.vacancyModel.findById(id).exec();
         if (!vacancy) {
            throw new NotFoundException(`Vacancy with ID ${id} not found`);
         }
         return { message: 'success', statusCode: 200, data: vacancy };
      } catch (error) {
         throw new BadRequestException('Failed to fetch vacancy');
      }
   }

   async update(id: string, updateVacancyDto: any): Promise<any> {
      try {
         const vacancyDoc = await this.vacancyModel.findById(id).exec();
         if (!vacancyDoc) {
            throw new NotFoundException(`Vacancy with ID ${id} not found`);
         }

         Object.assign(vacancyDoc, updateVacancyDto);
         const updated = await vacancyDoc.save();

         return { message: 'success', statusCode: 200, data: updated };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new BadRequestException('Failed to update vacancy');
      }
   }

   async remove(id: string): Promise<any> {
      try {
         const vacancyDoc = await this.vacancyModel.findById(id).exec();
         if (!vacancyDoc) {
            throw new NotFoundException(`Vacancy with ID ${id} not found`);
         }

         await vacancyDoc.deleteOne();
         return { message: 'success', statusCode: 200, data: `Vacancy ${id} deleted` };
      } catch (error) {
         if (error instanceof NotFoundException) throw error;
         throw new InternalServerErrorException('Failed to delete vacancy');
      }
   }
}
