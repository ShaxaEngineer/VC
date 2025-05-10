// src/models/letstalk.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LetstalkDocument = Letstalk & Document;

@Schema({ timestamps: true })
export class Letstalk {
   @Prop({ required: true, maxlength: 100 })
   letstalk_fullname: string;

   @Prop({ required: true, maxlength: 100 })
   letstalk_email: string;

   @Prop({ required: true, maxlength: 1000 })
   letstalk_message: string;


   @Prop({ required: true, maxlength: 1000 })
   letstalk_number: string;
}

export const LetstalkSchema = SchemaFactory.createForClass(Letstalk);
