import { DeleteMovie } from "@application/use-cases/movie/DeleteMovie";
import { IMovieWriteRepository } from "@application/ports/repositories/movie/IMovieWriteRepository";
import { ICache } from "@application/ports/cache/ICache";
import { MovieNotFoundException } from "@domain/exceptions/MovieNotFoundException";

describe("DeleteMovie UseCase", () => {
  let movieWrite: jest.Mocked<IMovieWriteRepository>;
  let cache: jest.Mocked<ICache>;
  let uc: DeleteMovie;

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

    uc = new DeleteMovie(movieWrite, cache);
    jest.clearAllMocks();
  });

  it("deletes movie successfully", async () => {
    movieWrite.delete.mockResolvedValue(true);

    await uc.execute("m1");

    expect(movieWrite.delete).toHaveBeenCalledWith("m1");
    expect(cache.del).toHaveBeenCalledWith(["movies:all"]);
  });

  it("throws MovieNotFoundException when movie not found", async () => {
    movieWrite.delete.mockResolvedValue(false);

    await expect(uc.execute("nonexistent")).rejects.toThrow(
      MovieNotFoundException,
    );
    expect(cache.del).not.toHaveBeenCalled();
  });
});
