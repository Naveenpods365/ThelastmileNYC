#!/bin/bash
set -e

APP_DIR="/var/www/dotc/thelastmilenyc"
BRANCH="main"
REPO_URL="https://github.com/Naveenpods365/ThelastmileNYC.git"

echo "=============================="
echo "🚀 Deployment Started"
echo "=============================="

cd "$APP_DIR"

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

echo "🔄 Restarting services..."

sudo systemctl restart thelastmilenyc

echo "=============================="
echo "✅ Deployment Finished"
echo "=============================="