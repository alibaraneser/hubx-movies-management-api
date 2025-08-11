import { Movie } from "../../../../domain/entities/Movie";

export interface IMovieReadRepository {
  findById(id: string): Promise<Movie | null>;
  findAll(): Promise<Movie[]>;
  findByImdbId(imdbId: string): Promise<Movie | null>;
}
