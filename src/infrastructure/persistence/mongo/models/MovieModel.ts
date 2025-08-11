import mongoose, { Schema, Document } from "mongoose";

export interface MovieDocument extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  rating: number;
  imdbId: string;
  director: mongoose.Types.ObjectId;
}

const movieSchema = new Schema<MovieDocument>(
  {
    title: { type: String, required: true },
    description: String,
    releaseDate: Date,
    genre: String,
    rating: Number,
    imdbId: { type: String, unique: true },
    director: { type: Schema.Types.ObjectId, ref: "Director" },
  },
  { timestamps: true },
);

export const MovieModel = mongoose.model<MovieDocument>("Movie", movieSchema);
