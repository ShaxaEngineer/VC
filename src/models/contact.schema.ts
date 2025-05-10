// src/models/contact.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
   @Prop({ required: true })
   contact_fullname: string;

   @Prop({ required: true })
   contact_email: string;

   @Prop({ required: true })
   contact_message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
