import mongoose, { Schema, Document } from "mongoose";

export interface DirectorDocument extends Document {
  firstName: string;
  secondName: string;
  birthDate: Date;
  bio: string;
}

const directorSchema = new Schema<DirectorDocument>(
  {
    firstName: { type: String, required: true },
    secondName: String,
    birthDate: Date,
    bio: String,
  },
  { timestamps: true },
);

export const DirectorModel = mongoose.model<DirectorDocument>(
  "Director",
  directorSchema,
);
