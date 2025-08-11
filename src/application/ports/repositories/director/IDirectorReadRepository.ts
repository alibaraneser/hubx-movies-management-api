import { Director } from "../../../../domain/entities/Director";

export interface IDirectorReadRepository {
  findById(id: string): Promise<Director | null>;
  findAll(): Promise<Director[]>;
}
