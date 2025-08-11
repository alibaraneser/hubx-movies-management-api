import { Movie } from "@domain/entities/Movie";
import { MovieDocument } from "../models/MovieModel";

export class MongoMovieMapper {
  static toDomain(doc: MovieDocument): Movie {
    return {
      id: (doc as unknown as { _id: { toString(): string } })._id.toString(),
      title: doc.title,
      description: doc.description,
      releaseDate: doc.releaseDate,
      genre: doc.genre,
      rating: doc.rating,
      imdbId: doc.imdbId,
      director: doc.director?.toString(),
    };
  }
}
