import { IDirectorWriteRepository } from "@application/ports/repositories/director/IDirectorWriteRepository";
import { Director } from "@domain/entities/Director";
import {
  DirectorModel,
  DirectorDocument,
} from "@infrastructure/persistence/mongo/models/DirectorModel";
import { MongoDirectorMapper } from "@infrastructure/persistence/mongo/mappers/MongoDirectorMapper";
import { CreateDirectorDto } from "@application/dto/director/CreateDirectorDto";

export class MongoDirectorWriteRepository implements IDirectorWriteRepository {
  async create(data: CreateDirectorDto): Promise<Director> {
    const doc: DirectorDocument = await DirectorModel.create(
      data as unknown as DirectorDocument,
    );
    return MongoDirectorMapper.toDomain(doc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await DirectorModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
