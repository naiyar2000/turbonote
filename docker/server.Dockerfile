FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy monorepo code (use .dockerignore to exclude node_modules!)
COPY . .

# Add this before prisma commands
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma client for production env
# In server.Dockerfile
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

# Build server (make sure tsconfig is monorepo aware)
RUN npm install
RUN npm run build:server
WORKDIR /app/apps/server

EXPOSE 4000

# Start server
CMD ["npm", "start"]
