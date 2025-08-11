import { container } from "@container/Container";
import { MongoMovieReadRepository } from "@infrastructure/persistence/mongo/repositories/MongoMovieReadRepository";
import { MongoMovieWriteRepository } from "@infrastructure/persistence/mongo/repositories/MongoMovieWriteRepository";
import { MongoDirectorReadRepository } from "@infrastructure/persistence/mongo/repositories/MongoDirectorReadRepository";
import { MongoDirectorWriteRepository } from "@infrastructure/persistence/mongo/repositories/MongoDirectorWriteRepository";

container.bind(
  MongoMovieReadRepository.name,
  () => new MongoMovieReadRepository(),
);
container.bind(
  MongoMovieWriteRepository.name,
  () => new MongoMovieWriteRepository(),
);
container.bind(
  MongoDirectorReadRepository.name,
  () => new MongoDirectorReadRepository(),
);
container.bind(
  MongoDirectorWriteRepository.name,
  () => new MongoDirectorWriteRepository(),
);
