import { DirectorResponseDto } from "../director/DirectorResponseDto";

export interface MovieResponseDto {
  id: string;
  title: string;
  description?: string;
  releaseDate?: string;
  genre?: string;
  rating?: number;
  imdbId: string;
  directorId?: string;
  director?: DirectorResponseDto;
  createdAt?: string;
  updatedAt?: string;
}
