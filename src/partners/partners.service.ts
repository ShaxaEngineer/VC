// partner.service.ts
import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from 'src/models/partners.schema';
import { ImageService } from 'src/images/image.service';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.dto';

@Injectable()
export class PartnerService {
   constructor(
      @InjectModel(Partner.name) private readonly partnerModel: Model<PartnerDocument>,
      private readonly imageService: ImageService,
   ) { }

   async create(createPartnerDto: CreatePartnerDto): Promise<any> {
      try {
         const createdPartner = new this.partnerModel(createPartnerDto);
         const result = await createdPartner.save();
         return { message: 'Partner created successfully', statusCode: 201, data: result };
      } catch (error) {
         throw new BadRequestException('Failed to create partner');
      }
   }

   async findAll(page: number, limit: number): Promise<any> {
      try {
         const skip = (page - 1) * limit;
         const [partners, total] = await Promise.all([
            this.partnerModel.find().skip(skip).limit(limit).exec(),
            this.partnerModel.countDocuments(),
         ]);

         return {
            message: 'Partners fetched successfully',
            statusCode: 200,
            data: partners,
            meta: {
               total,
               page,
               limit,
               totalPages: Math.ceil(total / limit),
            },
         };
      } catch (error) {
         throw new InternalServerErrorException('Failed to fetch partners');
      }
   }

   async findOne(id: string): Promise<any> {
      try {
         const partner = await this.partnerModel.findById(id).exec();
         if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
         }
         return { message: 'Partner fetched successfully', statusCode: 200, data: partner };
      } catch (error) {
         throw new BadRequestException('Failed to fetch partner');
      }
   }

   async update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<any> {
      try {
         const partner = await this.partnerModel.findById(id).exec();
         if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
         }

         const { partner_image } = updatePartnerDto;
         if (partner_image && partner_image !== partner.partner_image) {
            await this.imageService.deleteImage(partner.partner_image);
         }

         Object.assign(partner, updatePartnerDto);
         const updated = await partner.save();

         return { message: 'Partner updated successfully', statusCode: 200, data: updated };
      } catch (error) {
         throw new BadRequestException('Failed to update partner');
      }
   }

   async remove(id: string): Promise<any> {
      try {
         const partner = await this.partnerModel.findById(id).exec();
         if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
         }

         await partner.deleteOne();
         return { message: 'Partner deleted successfully', statusCode: 200, data: `Partner ${id} deleted` };
      } catch (error) {
         throw new InternalServerErrorException('Failed to delete partner');
      }
   }
}
