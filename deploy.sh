#!/bin/bash
set -e

APP_DIR="/var/www/html/ThelastmileNYC/nextjs/"
BRANCH="main"
REPO_URL="https://github.com/Naveenpods365/ThelastmileNYC.git"

echo "📥 Fetching latest code..."
git fetch $REPO_URL

echo "🔀 Switching branch..."
git checkout $BRANCH

echo "⬇️ Pulling updates..."
git pull $REPO_URL $BRANCH

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "📦 Building..."
npm run build

cd "$APP_DIR"

echo "🔄 Restarting services..."

pm2 restart nyc
pm2 save

echo "=============================="
echo "✅ Deployment Finished"
echo "=============================="