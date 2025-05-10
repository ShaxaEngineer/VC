// src/admin/schemas/candidate.schema.ts
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Vacancy } from '../models/vacancies.schema'; // Adjust the import based on your project structure

export type CandinateDocument = Candinate & Document;

@Schema({ timestamps: true })
export class Candinate {
   @Prop({ required: true })
   candinate_name: string;

   @Prop({ required: true })
   candinate_number: string;

   @Prop({ required: true })
   candinate_email: string;

   @Prop({ required: true })
   candinate_position: string;

   @Prop()
   candinate_resume: string; // Filename of the uploaded resume

   @Prop({ required: true })
   candinate_message: string; // candinate's message

   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vacancy' })
   applied_vacancy_id: Types.ObjectId;
}

export const CandinateSchema = SchemaFactory.createForClass(Candinate);
