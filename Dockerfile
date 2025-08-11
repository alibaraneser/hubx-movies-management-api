# 1) Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# 2) Dev deps (development)
FROM base AS development
RUN npm ci --ignore-scripts
COPY tsconfig.json ./
COPY src ./src
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# 3) Build
FROM base AS build
RUN npm ci --ignore-scripts
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# 4) Runtime (production)
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["npm", "start"]
