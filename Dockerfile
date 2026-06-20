# Step 1: Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install root dependencies
RUN npm ci

# Copy frontend source files
COPY src/ ./src
COPY public/ ./public
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
COPY jsconfig.json ./jsconfig.json
COPY ["original_images/stacklogix brain.png", "./"]

# Build the frontend (outputs to /app/dist)
RUN npm run build

# Copy server files
COPY server/ ./server

# Install backend dependencies
WORKDIR /app/server
RUN npm ci

# Go back to app root
WORKDIR /app

# Expose port (Hugging Face default)
EXPOSE 7860
ENV PORT=7860

# Command to run backend server
CMD ["node", "server/server.js"]
