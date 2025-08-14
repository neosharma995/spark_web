#!/usr/bin/env bash
set -euo pipefail

echo "Deployment started..."

cd /home/spark/spark_web

 
git fetch origin main
git reset --hard origin/main

echo "Installing dependencies…"
npm ci

echo "Building…"
npm run build

echo "Reloading PM2…"
 
pm2 reload 0 || pm2 restart 0

echo "Deployment finished!"
