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

   async getAllContacts(): Promise<any> {
      const contacts = await this.contactModel.find().sort({ createdAt: -1 }).lean();
      return {
         statusCode: 200,
         message: 'All contact records fetched successfully',
         data: contacts,
      };
   }
}
