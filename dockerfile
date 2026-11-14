# Base image
FROM node:22-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Application port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
