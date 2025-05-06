import { Schema } from 'mongoose';

export const NewsSchema = new Schema(
   {
      title: { type: String, required: true },
      content: { type: String, required: true },
   },
   { timestamps: true }
);
