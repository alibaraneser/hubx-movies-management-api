import dotenv from "dotenv";
dotenv.config();

export const AppConfig = {
  PORT: Number(process.env.PORT ?? 3000),
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
