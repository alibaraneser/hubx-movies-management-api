import { IMovieReadRepository } from "../../../../application/ports/repositories/movie/IMovieReadRepository";
import { Movie } from "../../../../domain/entities/Movie";
import { MovieModel } from "../models/MovieModel";
import { MongoMovieMapper } from "../mappers/MongoMovieMapper";

export class MongoMovieReadRepository implements IMovieReadRepository {
  async findById(id: string): Promise<Movie | null> {
    const doc = await MovieModel.findById(id).exec();
    return doc ? MongoMovieMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Movie[]> {
    const docs = await MovieModel.find().exec();
    return docs.map(MongoMovieMapper.toDomain);
  }

  async findByImdbId(imdbId: string): Promise<Movie | null> {
    const doc = await MovieModel.findOne({ imdbId }).exec();
    return doc ? MongoMovieMapper.toDomain(doc) : null;
  }
}
