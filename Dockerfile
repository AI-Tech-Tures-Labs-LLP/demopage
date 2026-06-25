# Step 1: Base image
FROM node:20-alpine

# Install nginx (this was missing — nginx.conf had nothing to run against)
RUN apk add --no-cache nginx

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
COPY ["original_images/stacklogix brain.png", "./public/"]

# Build the frontend (outputs to /app/dist)
RUN npm run build

# Copy server files
COPY server/ ./server

# Install backend dependencies
WORKDIR /app/server
RUN npm ci

# Go back to app root
WORKDIR /app

# --- New: wire up nginx ---

# Copy the built frontend into nginx's web root
RUN mkdir -p /usr/share/nginx/html \
    && cp -r /app/dist/* /usr/share/nginx/html/

# Copy nginx server config
# NOTE: Alpine's nginx package loads extra server blocks from /etc/nginx/http.d/,
# not /etc/nginx/conf.d/ like the Debian-based nginx image does.
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy and prep the startup script that launches both nginx and Node
COPY start.sh /start.sh
RUN chmod +x /start.sh

# nginx (port 80) is now what's actually exposed to traffic.
# The Node backend stays internal on 5000 and is reached only via
# nginx's /api/ proxy_pass — keep this in sync with nginx.conf.
EXPOSE 80
ENV PORT=5000

# Start nginx + the Node backend together
CMD ["/start.sh"]
