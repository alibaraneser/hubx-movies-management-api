import { IMovieReadRepository } from "../../../application/ports/repositories/movie/IMovieReadRepository";
import { IDirectorReadRepository } from "../../../application/ports/repositories/director/IDirectorReadRepository";
import { ICache } from "../../../application/ports/cache/ICache";
import { MovieMapper } from "../../../application/mappers/MovieMapper";
import { AppConstants } from "@shared/constants/AppConstants";
import { ENV } from "@config/env";

export class ListMovies {
  constructor(
    private readonly movieReadRepo: IMovieReadRepository,
    private readonly directorReadRepo: IDirectorReadRepository,
    private readonly cache: ICache,
  ) {}

  async execute() {
    const cacheKey = AppConstants.CACHE_KEYS.MOVIES_ALL;
    const cachedMovies = await this.cache.get<
      Array<{
        id: string;
        title: string;
        year: number;
        director: string;
        imdbId: string;
        rating: number;
      }>
    >(cacheKey);

    if (cachedMovies) {
      return cachedMovies;
    }

    const movies = await this.movieReadRepo.findAll();
    const movieDtos = await Promise.all(
      movies.map((m) =>
        MovieMapper.toResponseDtoWithDirector(m, this.directorReadRepo),
      ),
    );

    if (movieDtos.length > 0) {
      await this.cache.set(cacheKey, movieDtos, ENV.CACHE_TTL_SECONDS);
    }

    return movieDtos;
  }
}
