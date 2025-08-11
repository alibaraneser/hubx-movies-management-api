import { ListMovies } from "@application/use-cases/movie/ListMovies";
import { IMovieReadRepository } from "@application/ports/repositories/movie/IMovieReadRepository";
import { IDirectorReadRepository } from "@application/ports/repositories/director/IDirectorReadRepository";
import { ICache } from "@application/ports/cache/ICache";

jest.mock("@application/mappers/MovieMapper", () => ({
  MovieMapper: {
    toResponseDto: jest.fn((m) => ({ id: m.id, title: m.title })),
    toResponseDtoWithDirector: jest.fn((m) => ({
      id: m.id,
      title: m.title,
      director: { id: "d1", firstName: "Christopher" },
    })),
  },
}));
import { MovieMapper } from "@application/mappers/MovieMapper";

jest.mock("@config/env", () => ({
  ENV: {
    CACHE_TTL_SECONDS: 300,
  },
}));

describe("ListMovies UseCase", () => {
  let movieRead: jest.Mocked<IMovieReadRepository>;
  let directorRead: jest.Mocked<IDirectorReadRepository>;
  let cache: jest.Mocked<ICache>;
  let uc: ListMovies;

  beforeEach(() => {
    movieRead = {
      findById: jest.fn(),
      findAll: jest.fn(),
      findByImdbId: jest.fn(),
    } as unknown as jest.Mocked<IMovieReadRepository>;

    directorRead = {
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IDirectorReadRepository>;

    cache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as unknown as jest.Mocked<ICache>;

    uc = new ListMovies(movieRead, directorRead, cache);
    jest.clearAllMocks();
  });

  it("returns cached movies when available", async () => {
    const cachedMovies = [
      {
        id: "m1",
        title: "Inception",
        director: { id: "d1", firstName: "Christopher" },
      },
      {
        id: "m2",
        title: "Interstellar",
        director: { id: "d1", firstName: "Christopher" },
      },
    ];
    cache.get.mockResolvedValue(cachedMovies);

    const result = await uc.execute();

    expect(cache.get).toHaveBeenCalledWith("movies:all");
    expect(movieRead.findAll).not.toHaveBeenCalled();
    expect(result).toEqual(cachedMovies);
  });

  it("returns mapped movies from database when not cached", async () => {
    cache.get.mockResolvedValue(null);
    const mockMovies = [
      { id: "m1", title: "Inception" },
      { id: "m2", title: "Interstellar" },
    ] as any[];
    movieRead.findAll.mockResolvedValue(mockMovies);

    const result = await uc.execute();

    expect(cache.get).toHaveBeenCalledWith("movies:all");
    expect(movieRead.findAll).toHaveBeenCalled();
    expect(cache.set).toHaveBeenCalledWith("movies:all", result, 300);
    expect(MovieMapper.toResponseDtoWithDirector).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      {
        id: "m1",
        title: "Inception",
        director: { id: "d1", firstName: "Christopher" },
      },
      {
        id: "m2",
        title: "Interstellar",
        director: { id: "d1", firstName: "Christopher" },
      },
    ]);
  });

  it("returns empty array when no movies", async () => {
    cache.get.mockResolvedValue(null);
    movieRead.findAll.mockResolvedValue([]);

    const result = await uc.execute();

    expect(result).toEqual([]);
    expect(MovieMapper.toResponseDtoWithDirector).not.toHaveBeenCalled();
  });
});
