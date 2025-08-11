import morgan from "morgan";
import { logger } from "@shared/utils/logger";

export const LoggerMiddleware = morgan("combined", {
  stream: { write: (message) => logger.http(message.trim()) },
});
