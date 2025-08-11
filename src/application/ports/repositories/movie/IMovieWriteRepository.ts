import { Movie } from "../../../../domain/entities/Movie";

export interface IMovieWriteRepository {
  create(data: Partial<Movie>): Promise<Movie>;
  update(id: string, data: Partial<Movie>): Promise<Movie | null>;
  delete(id: string): Promise<boolean>;
}
