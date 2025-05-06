import { Document } from 'mongoose';

export interface Employer extends Document {
   employer_first_name: string;
   employer_last_name: string;
   employer_position: string;
   employer_image: string;
}
