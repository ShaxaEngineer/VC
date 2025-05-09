import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candinate, CandinateDocument } from '../models/candinates.schema';
import { CreateCandinateDto } from './candinates.dto';

@Injectable()
export class CandinatesService {
   constructor(
      @InjectModel(Candinate.name)
      private readonly candidateModel: Model<CandinateDocument>,
   ) { }

   async create(
      CreateCandinateDto: CreateCandinateDto,
   ): Promise<{ message: string; statusCode: number; data: any }> {
      const newCandidate = new this.candidateModel(CreateCandinateDto);
      const savedCandidate = await newCandidate.save();
      return {
         message: 'success',
         statusCode: 201,
         data: savedCandidate,
      };
   }

   async findAll(page = 1, limit = 10): Promise<any> {
      const skip = (page - 1) * limit;

      const [items, totalItems] = await Promise.all([
         this.candidateModel
            .find()
            .skip(skip)
            .limit(limit)
            .populate('applied_vacancy_id')
            .exec(),
         this.candidateModel.countDocuments(),
      ]);

      return {
         message: 'success',
         statusCode: 200,
         data: {
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
         },
      };
   }

   async findAllByVacancyId(vacancyId: string, page = 1, limit = 10): Promise<any> {
      const skip = (page - 1) * limit;

      const [items, totalItems] = await Promise.all([
         this.candidateModel
            .find({ applied_vacancy_id: vacancyId })
            .skip(skip)
            .limit(limit)
            .populate('applied_vacancy_id')
            .exec(),

         this.candidateModel.countDocuments({ applied_vacancy_id: vacancyId }),
      ]);

      return {
         message: 'success',
         statusCode: 200,
         data: {
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
         },
      };
   }


   async findOne(id: string): Promise<{ message: string; statusCode: number; data: Candinate }> {
      const candidate = await this.candidateModel
         .findById(id)
         .populate('applied_vacancy_id')
         .exec();

      if (!candidate) {
         throw new NotFoundException(`Candidate with ID ${id} not found`);
      }

      return {
         message: 'success',
         statusCode: 200,
         data: candidate,
      };
   }

   async remove(id: string): Promise<{ message: string; statusCode: number }> {
      const result = await this.candidateModel.findByIdAndDelete(id).exec();

      if (!result) {
         throw new NotFoundException(`Candidate with ID ${id} not found`);
      }

      return {
         message: 'Candidate deleted successfully',
         statusCode: 200,
      };
   }
}
