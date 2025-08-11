import http from "http";
import mongoose from "mongoose";
import { createApp } from "@main/app";
import "@container/bindings/RepositoryBindings";
import "@container/bindings/ServiceBindings";
import "@container/bindings/UseCaseBindings";
import { ENV } from "@config/env";
import { connect } from "@infrastructure/persistence/mongo/connect";
import { logger } from "@shared/utils/logger";

const app = createApp();
const server = http.createServer(app);

async function start() {
  try {
    await connect();
    server.listen(ENV.PORT, () => {
      logger.info(`Server started on port ${ENV.PORT}`);
    });
  } catch (err) {
    const e = err as Error;
    logger.error(`Startup error: ${e.message}`);
    process.exit(1);
  }
}

async function shutdown() {
  logger.warn("Shutting down...");
  await new Promise<void>((resolve) => server.close(() => resolve()));
  try {
    if (mongoose.connection.readyState) await mongoose.connection.close();
  } catch {
    // ignore
  }
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

start();
