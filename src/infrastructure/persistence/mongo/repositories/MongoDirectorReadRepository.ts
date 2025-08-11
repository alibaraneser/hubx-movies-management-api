import { IDirectorReadRepository } from "@application/ports/repositories/director/IDirectorReadRepository";
import { Director } from "@domain/entities/Director";
import { DirectorModel } from "@infrastructure/persistence/mongo/models/DirectorModel";
import { MongoDirectorMapper } from "@infrastructure/persistence/mongo/mappers/MongoDirectorMapper";

export class MongoDirectorReadRepository implements IDirectorReadRepository {
  async findById(id: string): Promise<Director | null> {
    const doc = await DirectorModel.findById(id).exec();
    return doc ? MongoDirectorMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Director[]> {
    const docs = await DirectorModel.find().exec();
    return docs.map(MongoDirectorMapper.toDomain);
  }
}
