import { container } from "@container/Container";
import { RedisCacheService } from "@infrastructure/persistence/redis/RedisCacheService";

container.bind(RedisCacheService.name, () => new RedisCacheService());
