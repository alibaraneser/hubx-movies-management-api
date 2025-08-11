import { container } from "@container/Container";
import { CreateMovie } from "@application/use-cases/movie/CreateMovie";
import { UpdateMovie } from "@application/use-cases/movie/UpdateMovie";
import { DeleteMovie } from "@application/use-cases/movie/DeleteMovie";
import { ListMovies } from "@application/use-cases/movie/ListMovies";
import { CreateDirector } from "@application/use-cases/director/CreateDirector";
import { DeleteDirector } from "@application/use-cases/director/DeleteDirector";
import { MongoMovieReadRepository } from "@infrastructure/persistence/mongo/repositories/MongoMovieReadRepository";
import { MongoMovieWriteRepository } from "@infrastructure/persistence/mongo/repositories/MongoMovieWriteRepository";
import { MongoDirectorReadRepository } from "@infrastructure/persistence/mongo/repositories/MongoDirectorReadRepository";
import { MongoDirectorWriteRepository } from "@infrastructure/persistence/mongo/repositories/MongoDirectorWriteRepository";
import { ICache } from "@application/ports/cache/ICache";

const cache = container.resolve("RedisCacheService") as ICache;

container.bind(CreateMovie.name, () => {
  const read = container.resolve(MongoMovieReadRepository);
  const write = container.resolve(MongoMovieWriteRepository);
  const directorRead = container.resolve(MongoDirectorReadRepository);
  return new CreateMovie(read, write, directorRead);
});

container.bind(UpdateMovie.name, () => {
  const write = container.resolve(MongoMovieWriteRepository);
  return new UpdateMovie(write, cache);
});

container.bind(DeleteMovie.name, () => {
  const write = container.resolve(MongoMovieWriteRepository);
  return new DeleteMovie(write, cache);
});

container.bind(ListMovies.name, () => {
  const read = container.resolve(MongoMovieReadRepository);
  const directorRead = container.resolve(MongoDirectorReadRepository);
  return new ListMovies(read, directorRead, cache);
});

container.bind(CreateDirector.name, () => {
  const write = container.resolve(MongoDirectorWriteRepository);
  return new CreateDirector(write);
});

container.bind(DeleteDirector.name, () => {
  const read = container.resolve(MongoDirectorReadRepository);
  const write = container.resolve(MongoDirectorWriteRepository);
  return new DeleteDirector(read, write);
});
