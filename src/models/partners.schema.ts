// src/partner/schemas/partner.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartnerDocument = Partner & Document;

@Schema({ timestamps: true })
export class Partner {
   @Prop({ required: true })
   partner_name: string;

   @Prop({ required: true })
   partner_information: string;


   @Prop({ required: true })
   partner_image: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
