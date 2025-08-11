import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import { ENV } from "@config/env";

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: "error",
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// CORS configuration
const corsOptions = {
  origin:
    ENV.NODE_ENV === "production"
      ? process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"]
      : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Helmet configuration
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
};

export const SecurityMiddlewares = [
  helmet(helmetConfig),
  cors(corsOptions),
  limiter,
  // Request size limiting
  (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers["content-length"] || "0");
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (contentLength > maxSize) {
      return res.status(413).json({
        status: "error",
        message: "Request entity too large",
      });
    }
    next();
  },
  // Remove sensitive headers
  (req: Request, res: Response, next: NextFunction) => {
    res.removeHeader("X-Powered-By");
    next();
  },
];
