import { IDirectorReadRepository } from "../../../application/ports/repositories/director/IDirectorReadRepository";
import { IDirectorWriteRepository } from "../../../application/ports/repositories/director/IDirectorWriteRepository";
import { DirectorNotFoundException } from "../../../domain/exceptions/DirectorNotFoundException";

export class DeleteDirector {
  constructor(
    private readonly directorReadRepo: IDirectorReadRepository,
    private readonly directorWriteRepo: IDirectorWriteRepository,
  ) {}

  async execute(id: string) {
    const existing = await this.directorReadRepo.findById(id);
    if (!existing) throw new DirectorNotFoundException(id);
    await this.directorWriteRepo.delete(id);
  }
}
