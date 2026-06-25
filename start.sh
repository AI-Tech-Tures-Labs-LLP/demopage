#!/bin/sh

# Start the Node.js backend server in the background
node /app/server/server.js &

# Start Nginx in the foreground
nginx -g "daemon off;"
