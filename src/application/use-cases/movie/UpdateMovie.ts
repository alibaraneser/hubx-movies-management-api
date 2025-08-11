import { IMovieWriteRepository } from "../../../application/ports/repositories/movie/IMovieWriteRepository";
import { ICache } from "../../../application/ports/cache/ICache";
import { UpdateMovieDto } from "../../../application/dto/movie/UpdateMovieDto";
import { MovieMapper } from "../../../application/mappers/MovieMapper";
import { MovieNotFoundException } from "../../../domain/exceptions/MovieNotFoundException";
import { AppConstants } from "@shared/constants/AppConstants";

export class UpdateMovie {
  constructor(
    private readonly movieWriteRepo: IMovieWriteRepository,
    private readonly cache: ICache,
  ) {}

  async execute(id: string, dto: UpdateMovieDto) {
    const updated = await this.movieWriteRepo.update(id, dto);
    if (!updated) throw new MovieNotFoundException(id);

    // Invalidate cache
    await this.cache.del([AppConstants.CACHE_KEYS.MOVIES_ALL]);

    return MovieMapper.toResponseDto(updated);
  }
}
