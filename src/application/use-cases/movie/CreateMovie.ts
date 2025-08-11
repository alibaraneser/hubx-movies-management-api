import { IMovieWriteRepository } from "../../../application/ports/repositories/movie/IMovieWriteRepository";
import { IMovieReadRepository } from "../../../application/ports/repositories/movie/IMovieReadRepository";
import { IDirectorReadRepository } from "../../../application/ports/repositories/director/IDirectorReadRepository";
import { CreateMovieDto } from "../../../application/dto/movie/CreateMovieDto";
import { MovieMapper } from "../../../application/mappers/MovieMapper";
import { DuplicateImdbIdException } from "../../../domain/exceptions/DuplicateImdbIdException";
import mongoose, { Types } from "mongoose";

export class CreateMovie {
  constructor(
    private readonly movieReadRepo: IMovieReadRepository,
    private readonly movieWriteRepo: IMovieWriteRepository,
    private readonly directorReadRepo: IDirectorReadRepository,
  ) {}

  async execute(dto: CreateMovieDto) {
    const incomingDirectorId = dto.directorId ?? dto.director;
    if (!incomingDirectorId) throw new Error("Director ID is required");

    const directorId =
      typeof incomingDirectorId === "string"
        ? incomingDirectorId
        : incomingDirectorId.toString();
    if (!mongoose.isValidObjectId(directorId))
      throw new Error("Invalid director ID");

    const director = await this.directorReadRepo.findById(directorId);
    if (!director) throw new Error("Director not found");

    const exists = await this.movieReadRepo.findByImdbId(dto.imdbId);
    if (exists) throw new DuplicateImdbIdException(dto.imdbId);

    const created = await this.movieWriteRepo.create({
      ...dto,
      ...(dto.year ? { releaseDate: new Date(Number(dto.year), 0, 1) } : {}),
      director: new Types.ObjectId(directorId).toString(),
    });

    return MovieMapper.toResponseDto(created);
  }
}
