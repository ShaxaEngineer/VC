// src/news/schemas/news.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
   @Prop({ required: true })
   title: string;

   @Prop({ required: true })
   content: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
