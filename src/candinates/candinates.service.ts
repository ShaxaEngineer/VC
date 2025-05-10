import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Candinate, CandinateDocument } from '../models/candinates.schema';
import { CreateCandinateDto } from './candinates.dto';
import { Vacancy, VacancyDocument } from 'src/models/vacancies.schema';
import { ImageService } from 'src/images/image.service';

@Injectable()
export class CandinatesService {
   constructor(
      @InjectModel(Candinate.name) private readonly candidateModel: Model<CandinateDocument>,
      @InjectModel(Vacancy.name) private readonly vacancyModel: Model<VacancyDocument>,
      private readonly imageService: ImageService,

   ) { }

   async create(
      createCandidateDto: CreateCandinateDto,
   ): Promise<{ message: string; statusCode: number; data: any }> {
      const { applied_vacancy_id, candinate_position } = createCandidateDto;

      const checkVacancy = await this.vacancyModel.findById(applied_vacancy_id);
      if (!checkVacancy) {
         throw new NotFoundException(`Vacancy with ID ${applied_vacancy_id} not found`);
      }

      const hasPosition = checkVacancy.vacancy_positions?.includes(candinate_position);
      if (!hasPosition) {
         throw new BadRequestException(`The position "${candinate_position}" is not available in the vacancy`);
      }

      const newCandidate = new this.candidateModel(createCandidateDto);
      const savedCandidate = await newCandidate.save();
      const populatedCandidate = await savedCandidate.populate('applied_vacancy_id');

      return {
         message: 'success',
         statusCode: 201,
         data: populatedCandidate,
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
         data: items,
         meta: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
         }
      };
   }
   //finall
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

      if (result.candinate_resume) {
         await this.imageService.deleteImage(result.candinate_resume);
      }

      return {
         message: 'success',
         statusCode: 200,
      };
   }

}
