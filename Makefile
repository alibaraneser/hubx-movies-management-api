# Variables
DOCKER_COMPOSE = docker-compose
APP_SERVICE = app

# Docker build and start
up:
	$(DOCKER_COMPOSE) up --build

# Run in the background
up-detach:
	$(DOCKER_COMPOSE) up -d --build

# Stop services
down:
	$(DOCKER_COMPOSE) down

# Follow logs
logs:
	$(DOCKER_COMPOSE) logs -f $(APP_SERVICE)

# Start without rebuilding
start:
	$(DOCKER_COMPOSE) up

# Run tests (inside the container)
test:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) npm test

# Run lint (inside the container)
lint:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) npm run lint

lint-fix:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) npm run lint -- --fix

# Format code (inside the container)
format:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) npm run format

# Clean all containers and volumes
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans
	docker system prune -f