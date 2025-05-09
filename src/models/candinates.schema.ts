// src/admin/schemas/candidate.schema.ts
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Vacancy } from '../models/vacancies.schema'; // Adjust the import based on your project structure

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true })
export class Candidate {
   @Prop({ required: true })
   candidate_name: string;

   @Prop({ required: true })
   candidate_number: string;

   @Prop({ required: true })
   candidate_email: string;

   @Prop()
   candidate_resume: string; // Filename of the uploaded resume

   @Prop({ required: true })
   candidate_message: string; // Candidate's message

   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vacancy' })
   applied_vacancy_id: Types.ObjectId;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
