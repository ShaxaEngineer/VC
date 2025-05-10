// src/letstalk/letstalk.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Letstalk, LetstalkDocument } from 'src/models/letstalk.schema';
import { CreateLetstalkDto } from './letstalk.dto';

@Injectable()
export class LetstalkService {
   constructor(
      @InjectModel(Letstalk.name) private letstalkModel: Model<LetstalkDocument>,
   ) { }

   async create(data: CreateLetstalkDto) {
      const newDoc = new this.letstalkModel(data);
      const saved = await newDoc.save();
      return {
         statusCode: 201,
         message: 'Letstalk entry created successfully',
         data: saved,
      };
   }

   async getAll(page: number, limit: number) {
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
         this.letstalkModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
         this.letstalkModel.countDocuments(),
      ]);

      return {
         message: 'success',
         statusCode: 200,
         data: items,
         meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
         },
      };
   }

   async remove(id: string) {
      const result = await this.letstalkModel.findByIdAndDelete(id).exec();
      if (!result) {
         throw new NotFoundException(`Letstalk record with ID ${id} not found`);
      }

      return {
         message: 'Deleted successfully',
         statusCode: 200,
      };
   }
}
