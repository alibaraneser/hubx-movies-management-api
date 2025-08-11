import { CreateMovie } from "@application/use-cases/movie/CreateMovie";
import { IMovieReadRepository } from "@application/ports/repositories/movie/IMovieReadRepository";
import { IMovieWriteRepository } from "@application/ports/repositories/movie/IMovieWriteRepository";
import { IDirectorReadRepository } from "@application/ports/repositories/director/IDirectorReadRepository";
import { DuplicateImdbIdException } from "@domain/exceptions/DuplicateImdbIdException";
import { MovieMapper } from "@application/mappers/MovieMapper";
import mongoose from "mongoose";

jest.mock("@application/mappers/MovieMapper", () => ({
  MovieMapper: {
    toResponseDto: jest.fn(),
  },
}));

describe("CreateMovie UseCase", () => {
  let movieRead: jest.Mocked<IMovieReadRepository>;
  let movieWrite: jest.Mocked<IMovieWriteRepository>;
  let directorRead: jest.Mocked<IDirectorReadRepository>;
  let uc: CreateMovie;

  const validDirectorId = "507f1f77bcf86cd799439011";
  const dto = {
    title: "Inception",
    year: 2010,
    directorId: validDirectorId,
    imdbId: "tt1375666",
    rating: 8.8,
  };

  beforeEach(() => {
    movieRead = {
      findByImdbId: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<IMovieReadRepository>;

    movieWrite = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IMovieWriteRepository>;

    directorRead = {
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IDirectorReadRepository>;

    uc = new CreateMovie(movieRead, movieWrite, directorRead);

    jest.clearAllMocks();

    // Varsayılan olarak geçerli ObjectId döndür
    jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(true);
  });

  it("creates movie successfully", async () => {
    directorRead.findById.mockResolvedValue({ id: validDirectorId } as any);
    movieRead.findByImdbId.mockResolvedValue(null);
    const mockCreatedMovie = {
      id: "m1",
      title: dto.title,
      imdbId: dto.imdbId,
    } as any;
    movieWrite.create.mockResolvedValue(mockCreatedMovie);
    (MovieMapper.toResponseDto as jest.Mock).mockReturnValue({
      id: "m1",
      title: dto.title,
    });

    const result = await uc.execute(dto);

    expect(directorRead.findById).toHaveBeenCalledWith(validDirectorId);
    expect(movieRead.findByImdbId).toHaveBeenCalledWith(dto.imdbId);
    expect(movieWrite.create).toHaveBeenCalled();
    expect(MovieMapper.toResponseDto).toHaveBeenCalledWith(mockCreatedMovie);
    expect(result).toEqual({ id: "m1", title: dto.title });
  });

  it("throws if directorId is missing", async () => {
    await expect(uc.execute({ ...dto, directorId: undefined })).rejects.toThrow(
      "Director ID is required",
    );
    expect(movieWrite.create).not.toHaveBeenCalled();
  });

  it("throws if directorId is invalid", async () => {
    (mongoose.isValidObjectId as jest.Mock).mockReturnValue(false);

    await expect(uc.execute(dto)).rejects.toThrow("Invalid director ID");
    expect(movieWrite.create).not.toHaveBeenCalled();
  });

  it("throws if director not found", async () => {
    directorRead.findById.mockResolvedValue(null);

    await expect(uc.execute(dto)).rejects.toThrow("Director not found");
    expect(movieWrite.create).not.toHaveBeenCalled();
  });

  it("throws if duplicate imdbId found", async () => {
    directorRead.findById.mockResolvedValue({ id: validDirectorId } as any);
    movieRead.findByImdbId.mockResolvedValue({ id: "mX" } as any);

    await expect(uc.execute(dto)).rejects.toBeInstanceOf(
      DuplicateImdbIdException,
    );
    expect(movieWrite.create).not.toHaveBeenCalled();
  });
});
