import { CreateDirector } from "@application/use-cases/director/CreateDirector";
import { IDirectorWriteRepository } from "@application/ports/repositories/director/IDirectorWriteRepository";
import { CreateDirectorDto } from "@application/dto/director/CreateDirectorDto";
import { Director } from "@domain/entities/Director";

jest.mock("@application/mappers/DirectorMapper", () => ({
  DirectorMapper: {
    toResponseDto: jest.fn(),
  },
}));

import { DirectorMapper } from "@application/mappers/DirectorMapper";

describe("CreateDirector UseCase", () => {
  let repo: jest.Mocked<IDirectorWriteRepository>;
  let uc: CreateDirector;

  const dto: CreateDirectorDto = {
    firstName: "Christopher",
    secondName: "Nolan",
    birthDate: new Date("1970-07-30"),
    bio: "Director of Inception",
  };

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IDirectorWriteRepository>;

    uc = new CreateDirector(repo);

    jest.clearAllMocks();
  });

  it("creates director and maps to response dto", async () => {
    const mockDirector = {
      id: "d1",
      firstName: dto.firstName,
      secondName: dto.secondName,
      birthDate: dto.birthDate,
      bio: dto.bio,
    } as unknown as Director;

    const mockResponse = { id: "d1", fullName: "Christopher Nolan" };

    repo.create.mockResolvedValue(mockDirector);
    (DirectorMapper.toResponseDto as jest.Mock).mockReturnValue(mockResponse);

    const result = await uc.execute(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(DirectorMapper.toResponseDto).toHaveBeenCalledWith(mockDirector);
    expect(result).toEqual(mockResponse);
  });

  it("throws if repository.create fails", async () => {
    repo.create.mockRejectedValue(new Error("DB error"));

    await expect(uc.execute(dto)).rejects.toThrow("DB error");
    expect(DirectorMapper.toResponseDto).not.toHaveBeenCalled();
  });
});
