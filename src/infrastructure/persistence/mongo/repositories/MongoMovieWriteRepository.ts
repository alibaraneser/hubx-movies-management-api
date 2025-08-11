import { IMovieWriteRepository } from "@application/ports/repositories/movie/IMovieWriteRepository";
import { Movie } from "@domain/entities/Movie";
import {
  MovieModel,
  MovieDocument,
} from "@infrastructure/persistence/mongo/models/MovieModel";
import { MongoMovieMapper } from "@infrastructure/persistence/mongo/mappers/MongoMovieMapper";

export class MongoMovieWriteRepository implements IMovieWriteRepository {
  async create(data: Partial<Movie>): Promise<Movie> {
    const doc: MovieDocument = await MovieModel.create(
      data as unknown as MovieDocument,
    );
    return MongoMovieMapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Movie>): Promise<Movie | null> {
    const doc = await MovieModel.findByIdAndUpdate(
      id,
      data as unknown as MovieDocument,
      { new: true },
    ).exec();
    return doc ? MongoMovieMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await MovieModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
