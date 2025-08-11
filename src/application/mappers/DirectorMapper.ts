import { Director } from "@domain/entities/Director";
import { DirectorDocument } from "@infrastructure/persistence/mongo/models/DirectorModel";
import { DirectorResponseDto } from "../dto/director/DirectorResponseDto";

export class DirectorMapper {
  static toDomain(doc: DirectorDocument): Director {
    return {
      id: (doc as unknown as { _id: { toString(): string } })._id.toString(),
      firstName: doc.firstName,
      secondName: doc.secondName,
      birthDate: doc.birthDate,
      bio: doc.bio,
    };
  }

  static toResponseDto(
    input: Director | DirectorDocument,
  ): DirectorResponseDto {
    const isDoc = (val: Director | DirectorDocument): val is DirectorDocument =>
      (val as unknown as { _id?: unknown })._id !== undefined;
    const d: Director = isDoc(input) ? DirectorMapper.toDomain(input) : input;
    return {
      id: d.id ?? "",
      firstName: d.firstName,
      secondName: d.secondName,
      birthDate: d.birthDate?.toISOString?.() ?? d.birthDate,
      bio: d.bio,
    };
  }
}
