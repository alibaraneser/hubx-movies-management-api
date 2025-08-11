import { DeleteDirector } from "@application/use-cases/director/DeleteDirector";
import { IDirectorReadRepository } from "@application/ports/repositories/director/IDirectorReadRepository";
import { IDirectorWriteRepository } from "@application/ports/repositories/director/IDirectorWriteRepository";
import { DirectorNotFoundException } from "@domain/exceptions/DirectorNotFoundException";
import { Director } from "@domain/entities/Director";

describe("DeleteDirector UseCase", () => {
  let readRepo: jest.Mocked<IDirectorReadRepository>;
  let writeRepo: jest.Mocked<IDirectorWriteRepository>;
  let uc: DeleteDirector;

  const directorId = "d1";

  beforeEach(() => {
    readRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IDirectorReadRepository>;

    writeRepo = {
      create: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IDirectorWriteRepository>;

    uc = new DeleteDirector(readRepo, writeRepo);

    jest.clearAllMocks();
  });

  it("deletes director when found", async () => {
    const mockDirector = {
      id: directorId,
      firstName: "Christopher",
      secondName: "Nolan",
      birthDate: new Date("1970-07-30"),
    } as unknown as Director;

    readRepo.findById.mockResolvedValue(mockDirector);
    writeRepo.delete.mockResolvedValue(true);

    await uc.execute(directorId);

    expect(readRepo.findById).toHaveBeenCalledWith(directorId);
    expect(writeRepo.delete).toHaveBeenCalledWith(directorId);
  });

  it("throws DirectorNotFoundException when director does not exist", async () => {
    readRepo.findById.mockResolvedValue(null);

    await expect(uc.execute(directorId)).rejects.toBeInstanceOf(
      DirectorNotFoundException,
    );

    expect(readRepo.findById).toHaveBeenCalledWith(directorId);
    expect(writeRepo.delete).not.toHaveBeenCalled();
  });
});
