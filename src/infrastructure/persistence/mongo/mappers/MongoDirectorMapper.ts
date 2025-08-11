import { Director } from "@domain/entities/Director";
import { DirectorDocument } from "../models/DirectorModel";

export class MongoDirectorMapper {
  static toDomain(doc: DirectorDocument): Director {
    return {
      id: (doc as unknown as { _id: { toString(): string } })._id.toString(),
      firstName: doc.firstName,
      secondName: doc.secondName,
      birthDate: doc.birthDate,
      bio: doc.bio,
    };
  }
}
