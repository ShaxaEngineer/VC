// src/contact/contact.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from 'src/models/contact.schema';
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
   constructor(
      @InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>,
   ) { }

   async createContact(createContactDto: CreateContactDto): Promise<any> {
      const newContact = new this.contactModel(createContactDto);
      const saved = await newContact.save();
      return {
         statusCode: 201,
         message: 'Contact created successfully',
         data: saved,
      };
   }

   async getAllContacts(page: number, limit: number): Promise<any> {
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
         this.contactModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
         this.contactModel.countDocuments(),
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

   async deleteContact(id: string): Promise<any> {
      const deleted = await this.contactModel.findByIdAndDelete(id).lean();

      if (!deleted) {
         return {
            statusCode: 404,
            message: 'Contact not found',
         };
      }

      return {
         statusCode: 200,
         message: 'Contact deleted successfully',
         data: deleted,
      };
   }


}
