import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from '../models/candinates.schema';
import { CreateCandidateDto } from './candinates.dto';

@Injectable()
export class CandinatesService {
   constructor(
      @InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>,
   ) { }

   async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
      const newCandidate = new this.candidateModel(createCandidateDto);
      return newCandidate.save();
   }

   async findAll(): Promise<Candidate[]> {
      return this.candidateModel.find().populate('applied_vacancy_id').exec();
   }

   async findOne(id: string): Promise<Candidate> {
      const candidate = await this.candidateModel.findById(id).populate('applied_vacancy_id').exec();
      if (!candidate) throw new NotFoundException(`Candidate with ID ${id} not found`);
      return candidate;
   }

   async remove(id: string): Promise<void> {
      const result = await this.candidateModel.findByIdAndDelete(id).exec();
      if (!result) throw new NotFoundException(`Candidate with ID ${id} not found`);
   }
}
