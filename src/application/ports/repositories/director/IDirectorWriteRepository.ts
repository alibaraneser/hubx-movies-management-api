import { Director } from "@domain/entities/Director";
import { CreateDirectorDto } from "@application/dto/director/CreateDirectorDto";

export interface IDirectorWriteRepository {
  create(data: CreateDirectorDto): Promise<Director>;
  delete(id: string): Promise<boolean>;
}
