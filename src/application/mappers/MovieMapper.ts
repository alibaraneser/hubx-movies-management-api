import { Movie } from "@domain/entities/Movie";
import { MovieDocument } from "@infrastructure/persistence/mongo/models/MovieModel";
import { MovieResponseDto } from "../dto/movie/MovieResponseDto";
import { IDirectorReadRepository } from "../ports/repositories/director/IDirectorReadRepository";

export class MovieMapper {
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

  static toResponseDto(movie: Movie | MovieDocument): MovieResponseDto {
    const isDoc = (val: Movie | MovieDocument): val is MovieDocument =>
      (val as unknown as { _id?: unknown })._id !== undefined;
    const m: Movie = isDoc(movie) ? MovieMapper.toDomain(movie) : movie;
    return {
      id: m.id ?? "",
      title: m.title,
      description: m.description,
      releaseDate: m.releaseDate?.toISOString?.() ?? m.releaseDate,
      genre: m.genre,
      rating: m.rating,
      imdbId: m.imdbId,
      directorId: m.director,
    };
  }

  static async toResponseDtoWithDirector(
    movie: Movie | MovieDocument,
    directorRepo: IDirectorReadRepository,
  ): Promise<MovieResponseDto> {
    const baseDto = MovieMapper.toResponseDto(movie);

    if (baseDto.directorId) {
      try {
        const director = await directorRepo.findById(baseDto.directorId);
        if (director) {
          baseDto.director = {
            id: director.id,
            firstName: director.firstName,
            secondName: director.secondName,
            birthDate: director.birthDate?.toISOString(),
            bio: director.bio,
            createdAt: director.createdAt?.toISOString(),
            updatedAt: director.updatedAt?.toISOString(),
          };
        }
      } catch (error) {
        console.warn(`Director not found for movie ${baseDto.id}:`, error);
      }
    }

    return baseDto;
  }
}
