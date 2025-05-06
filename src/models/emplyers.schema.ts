// src/employers/schemas/employer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployerDocument = Employer & Document;

@Schema({ timestamps: true })
export class Employer {
   @Prop({ required: true })
   employer_first_name: string;

   @Prop({ required: true })
   employer_last_name: string;

   @Prop({ required: true })
   employer_position: string;

   @Prop({ required: true })
   employer_image: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);
