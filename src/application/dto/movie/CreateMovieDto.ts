import { Types } from "mongoose";

export interface CreateMovieDto {
  title: string;
  imdbId: string;
  rating?: number;
  year?: number;
  directorId?: string;
  description?: string;
  releaseDate?: Date;
  genre?: string;
  director?: string | Types.ObjectId;
}
