// src/admin/schemas/admin.schema.tss

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
   @Prop({ required: true })
   username: string;

   @Prop({ required: true })
   password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
