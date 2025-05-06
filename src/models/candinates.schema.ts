import { Schema } from 'mongoose';

export const CandidateSchema = new Schema(
   {
      candidate_name: { type: String, required: true },
      candidate_number: { type: String, required: true },
      candidate_email: { type: String, required: true },
      candidate_resume: { type: String }, // Filename of the uploaded resume
      candidate_message: { type: String, required: true }, // Candidate's message
      applied_vacancy_id: { type: Schema.Types.ObjectId, ref: 'Vacancy' },
   },
   { timestamps: true }
);


