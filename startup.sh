#!/bin/bash
echo "Starting app with debug information..."
cd /home/site/wwwroot
pwd
ls -la
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "Starting server.js..."
node server.js
