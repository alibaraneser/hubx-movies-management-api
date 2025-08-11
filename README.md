
# 🎬 HubX Movies Management API

## 📌 Overview

HubX Movies Management API is a RESTful backend service built with **Node.js**, **TypeScript**, and **MongoDB (Mongoose)**, designed with **Clean Architecture** principles.

It manages **movies** and **directors** while providing a scalable, testable, and maintainable structure.
  
---  

## 🚀 Features

### 🔹 Architecture

- **Clean Architecture**: Layered structure for dependency control and easy testability.

- **Controller → Service → Repository → Database** structure.

- **Dependency Injection**: Services and repositories use interfaces for loose coupling.

- **Interface Segregation Principle (ISP)**: Separate Read and Write repository interfaces to enhance modularity and maintainability.

## 📐 Interface Separation, SOLID & Clean Architecture

Following SOLID principles (especially Interface Segregation), repository interfaces are separated into **Read** and **Write** interfaces for each entity (e.g., `IMovieReadRepository`, `IMovieWriteRepository`). This design is intentionally done following **SOLID** principles, especially the **Interface Segregation Principle (ISP)**.

### Why split Read and Write interfaces?

- **Single Responsibility:** Each interface has one clear responsibility, either reading data or modifying it.

- **Loose Coupling:** Services depending on repositories only rely on the methods they actually need.

- **Flexibility:** Easier to implement different storage or caching mechanisms that might only support read or write operations.

- **Testability:** Unit testing becomes simpler as you can mock only the required behavior.

- **Clear Intent:** Code clearly expresses intent whether it's querying data or modifying it.

### How is it implemented?

- `IMovieReadRepository` — defines methods for fetching movies (e.g., `findById`, `findAll`, `findByImdbId`).

- `IMovieWriteRepository` — defines methods for creating, updating, deleting movies.

- Service layer classes accept these interfaces separately via dependency injection.

This approach enhances maintainability and scalability of the project, adhering to **Clean Architecture** best practices.

### 🔹 Database

- **MongoDB** with **Mongoose** ODM.

- Indexes for performance optimization (`imdbId` is unique).

- Schema validation for data integrity.

### 🔹 Cache

- **Redis cache added:** Implemented a Redis-based caching layer to store movie data for faster retrieval. This reduces database query load and significantly improves API response times.

### 🔹 Validation

- **Joi** for request body, params, and query validation.

- Returns meaningful error messages (`400 Bad Request`) for invalid data.

### 🔹 Error Handling

- **ApiError** class for centralized error handling.

- **errorHandler** middleware for consistent JSON error responses.

### 🔹 Logging

- **Winston** for structured JSON logs.

- **Morgan** for HTTP request logging.

- Production log levels: `info`, `error`, `warn`.

### 🔹 Security

- **helmet**: Secure HTTP headers.

- **cors**: Cross-Origin Resource Sharing control.

- **express-rate-limit**: Prevent brute-force and excessive requests.

### 🔹 Linting & Git Hooks

- **ESLint** for consistent code style and best practices.
- **Prettier** for code formatting.
- **Husky** to enforce linting and tests before commits.

### 🔹 Testing

- **Unit tests**: Service-level testing with Jest.

- **Integration tests**: Endpoint testing with Supertest.

- **Coverage threshold** to ensure code quality.

### 🔹 Containerization

- **Dockerfile** + **docker-compose** to run API and MongoDB with one command.

- **Makefile** for shortcut commands.

### 🔹 CI/CD

- **GitHub Actions** pipeline:

- Lint

- Test

- Coverage report

- Blocks merges if coverage is below threshold.

### 🔹 API Documentation

- **Swagger UI** documentation generated from OpenAPI 3.0 spec.
- **Postman collection** included for quick testing.

- Postman collection included.

- Environment variables for flexible testing.

---  

## 🛠 Tech Stack & Purpose

| Technology | Purpose |

| -------------------------------- | ----------------------------- |

| Node.js + Express | Backend REST API |

| TypeScript | Type safety & maintainability |

| MongoDB + Mongoose | NoSQL database & ODM |

| Joi | Data validation |

| Winston + Morgan | Logging |

| helmet, cors, express-rate-limit | Security |

| Jest + Supertest | Automated testing |

| Docker + docker-compose | Containerization |

| GitHub Actions | CI/CD |
  
---  

## ⚙️ Environment Variables

Create a `.env` file:

```env  
  
PORT=3000  
  
MONGO_URI=mongodb://mongo:27017/hubx-movies  
  
NODE_ENV=development  
  
CORS_ORIGIN=*  
  
LOG_LEVEL=info  
  
```  
  
---  

## 📂 Project Structure

The project structure remains the same and follows the Clean Architecture layering:

```  
.  
├── docs                               # Project documentation and reference files  
├── src                                # Main application source code  
│   ├── application                    # Application layer: business logic, DTOs, use-cases  
│   │   ├── dto                        # Data Transfer Objects for input/output handling  
│   │   │   ├── director               # DTOs specific to director operations  
│   │   │   └── movie                  # DTOs specific to movie operations  
│   │   ├── mappers                    # Mapping between entities and DTOs  
│   │   ├── ports                      # Interfaces for external dependencies  
│   │   │   ├── cache                  # Cache-related interfaces  
│   │   │   └── repositories           # Repository interfaces for data access  
│   │   │       ├── director           # Repository interfaces for directors  
│   │   │       └── movie              # Repository interfaces for movies  
│   │   └── use-cases                  # Application services implementing business rules  
│   │       ├── director               # Use-cases related to directors  
│   │       └── movie                  # Use-cases related to movies  
│   ├── config                         # Application configuration settings  
│   │   └── environments               # Environment-specific configuration (dev, prod, test)  
│   ├── container                      # Dependency injection container setup  
│   │   └── bindings                   # Bindings for services, repositories, and use-cases  
│   ├── domain                         # Core domain layer: entities and domain logic  
│   │   ├── entities                   # Domain models representing core concepts  
│   │   └── exceptions                 # Domain-specific exception classes  
│   ├── infrastructure                 # Technical implementations (DB, cache, APIs)  
│   │   └── persistence                # Persistence layer implementations  
│   │       ├── mongo                  # MongoDB-related persistence logic  
│   │       │   ├── mappers             # MongoDB entity mapping  
│   │       │   ├── models              # MongoDB schemas/models  
│   │       │   └── repositories        # MongoDB repository implementations  
│   │       └── redis                  # Redis cache implementations  
│   ├── main                           # Application entry points (bootstrapping, server setup)  
│   ├── presentation                   # Presentation layer: handling HTTP requests/responses  
│   │   └── http                       # HTTP-specific implementation  
│   │       ├── controllers            # Handle incoming HTTP requests  
│   │       ├── middlewares             # Request/response middleware logic  
│   │       ├── routes                  # API route definitions  
│   │       └── validations             # Request validation schemas  
│   └── shared                         # Shared utilities and constants across the app  
│       ├── constants                  # Constant values used across the application  
│       ├── types                      # Common type definitions  
│       └── utils                      # Helper and utility functions  
└── tests                              # Automated tests for the application  
 └── unit                           # Unit tests └── application                # Unit tests for application layer ├── director               # Tests for director-related logic └── movie                  # Tests for movie-related logic  
```  

This structure ensures:

- Clear separation of concerns
- Easy testability
- Alignment with SOLID and Clean Architecture principles

## 📦 Installation

### 1️⃣ Clone the repo

```bash  
  
git  clone  https://github.com/alibaraneser/hubx-movies-management-api.git  
  
cd  hubx-movies-management-api  
  
```  

### 2️⃣ Run with Docker (Recommended)

```bash  
  
make up-detach  
```  
  
---  

## 🧪 Testing

### Unit tests

```bash  
  
npm  run  test  
  
```  

Coverage report:

```bash  
  
npm  run  test:coverage  
  
```  
  
---  

## 📄Docs

### Postman

Import the file:

```  
  
docs/HubX-Movies.postman_collection.json  
  
```  

### Swagger

Import the file:

```  
  
docs/hubx_movies_api_openapi.yaml  
  
```  

Set the `BASE_URL` environment variable according to your `.env` file.
  
---  

## 🛡 Security & Logging

- **helmet** → Secures HTTP headers.

- **cors** → Controls allowed domains.

- **express-rate-limit** → Limits requests per IP.

- **Winston** → Structured JSON logs.

- **Morgan** → HTTP request logging.

---  

## ⚙️ CI/CD

- Runs on each push and PR:

1. Install dependencies (`npm ci`)

2. Lint code

3. Run tests

4. Generate coverage report

- Fails the build if coverage is below threshold.

---  

## 🚀 Demo

- **API URL**: 46.62.163.78/api

---  

## 👨‍💻 Author

**Baran Eser**

Senior Software Engineer