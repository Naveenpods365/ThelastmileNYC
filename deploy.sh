#!/bin/bash
set -e

# Load Node/NPM globally from typical profiles
if [ -f "$HOME/.bashrc" ]; then
    source "$HOME/.bashrc"
fi

if [ -f "$HOME/.profile" ]; then
    source "$HOME/.profile"
fi

# Load NVM depending on which user is executing the script
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    \. "$NVM_DIR/nvm.sh"
elif [ -s "/root/.nvm/nvm.sh" ]; then
    export NVM_DIR="/root/.nvm"
    \. "$NVM_DIR/nvm.sh"
fi

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