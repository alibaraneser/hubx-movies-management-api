import { IDirectorWriteRepository } from "../../../application/ports/repositories/director/IDirectorWriteRepository";
import { CreateDirectorDto } from "../../../application/dto/director/CreateDirectorDto";
import { DirectorMapper } from "../../../application/mappers/DirectorMapper";
import { Director } from "@domain/entities/Director";

export class CreateDirector {
  constructor(private readonly directorWriteRepo: IDirectorWriteRepository) {}

  async execute(dto: CreateDirectorDto) {
    const created: Director = await this.directorWriteRepo.create(dto);
    return DirectorMapper.toResponseDto(created);
  }
}
