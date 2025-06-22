FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy monorepo code (use .dockerignore to exclude node_modules!)
COPY . .


# Build server (make sure tsconfig is monorepo aware)
RUN npm install
RUN npm run build:web
WORKDIR /app/apps/web

EXPOSE 3000

# Start server
CMD ["npm", "start"]
