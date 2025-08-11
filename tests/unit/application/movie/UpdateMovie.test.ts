import { UpdateMovie } from "@application/use-cases/movie/UpdateMovie";
import { IMovieWriteRepository } from "@application/ports/repositories/movie/IMovieWriteRepository";
import { ICache } from "@application/ports/cache/ICache";
import { MovieNotFoundException } from "@domain/exceptions/MovieNotFoundException";

jest.mock("@application/mappers/MovieMapper", () => ({
  MovieMapper: {
    toResponseDto: jest.fn(),
  },
}));
import { MovieMapper } from "@application/mappers/MovieMapper";

describe("UpdateMovie UseCase", () => {
  let movieWrite: jest.Mocked<IMovieWriteRepository>;
  let cache: jest.Mocked<ICache>;
  let uc: UpdateMovie;
  const movieId = "m1";
  const dto = { title: "New Title" };

  beforeEach(() => {
    movieWrite = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IMovieWriteRepository>;

    cache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as unknown as jest.Mocked<ICache>;

    uc = new UpdateMovie(movieWrite, cache);
    jest.clearAllMocks();
  });

  it("updates movie when found", async () => {
    const mockUpdatedMovie = { id: movieId, title: dto.title } as any;
    movieWrite.update.mockResolvedValue(mockUpdatedMovie);
    (MovieMapper.toResponseDto as jest.Mock).mockReturnValue({
      id: movieId,
      title: dto.title,
    });

    const result = await uc.execute(movieId, dto);

    expect(movieWrite.update).toHaveBeenCalledWith(movieId, dto);
    expect(cache.del).toHaveBeenCalledWith(["movies:all"]);
    expect(MovieMapper.toResponseDto).toHaveBeenCalledWith(mockUpdatedMovie);
    expect(result).toEqual({ id: movieId, title: dto.title });
  });

  it("throws MovieNotFoundException when movie not found", async () => {
    movieWrite.update.mockResolvedValue(null);

    await expect(uc.execute(movieId, dto)).rejects.toBeInstanceOf(
      MovieNotFoundException,
    );
    expect(cache.del).not.toHaveBeenCalled();
    expect(MovieMapper.toResponseDto).not.toHaveBeenCalled();
  });
});
