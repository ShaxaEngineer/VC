// src/vacancies/schemas/vacancy.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacancyDocument = Vacancy & Document;

@Schema({ timestamps: true })
export class Vacancy {
   @Prop({ required: true })
   vacancy_name: string;

   @Prop({ required: true })
   vacancy_category: string;


   @Prop({ required: true })
   vacancy_image: string;

   @Prop({ type: [String], required: true })
   vacancy_positions: string[];
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
