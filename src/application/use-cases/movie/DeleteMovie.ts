import { IMovieWriteRepository } from "../../../application/ports/repositories/movie/IMovieWriteRepository";
import { ICache } from "../../../application/ports/cache/ICache";
import { MovieNotFoundException } from "../../../domain/exceptions/MovieNotFoundException";
import { AppConstants } from "@shared/constants/AppConstants";

export class DeleteMovie {
  constructor(
    private readonly movieWriteRepo: IMovieWriteRepository,
    private readonly cache: ICache,
  ) {}

  async execute(id: string) {
    const ok = await this.movieWriteRepo.delete(id);
    if (!ok) throw new MovieNotFoundException(id);

    // Invalidate cache
    await this.cache.del([AppConstants.CACHE_KEYS.MOVIES_ALL]);
  }
}
