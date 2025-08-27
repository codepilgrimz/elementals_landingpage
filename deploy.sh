#!/bin/bash
# deploy.sh

set -e  # stop on first error

# Default build mode or use first argument
BUILD_MODE=${1:-HOME}
BUILD_DIR="dist"

# Set variables based on build mode
case $BUILD_MODE in
  "HOME")
    APP_NAME="elementalsnft.fun"
    ;;
  "BOX")
    APP_NAME="box.elementalsnft.fun"
    ;;
  *)
    echo "❌ Unknown build mode: $BUILD_MODE"
    echo "✅ Valid modes: HOME, BOX"
    exit 1
    ;;
esac

DEPLOY_DIR="/var/www/$APP_NAME/html"

echo "🔨 Building React Vite project in $BUILD_MODE mode..."

# Update the .env file with the desired build mode
if [ -f .env ]; then
  sed -i 's/^VITE_BUILD_MOD=.*/VITE_BUILD_MOD='"$BUILD_MODE"'/' .env
else
  echo "VITE_BUILD_MOD=$BUILD_MODE" > .env
fi

npm run build

echo "🚀 Deploying $APP_NAME to $DEPLOY_DIR ..."

# Create target dir if not exist
sudo mkdir -p $DEPLOY_DIR

# Remove old files
sudo rm -rf $DEPLOY_DIR/*

# Copy new build
sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/

# Set appropriate permissions (adjust as needed)
sudo chown -R www-data:www-data $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

echo "✅ $BUILD_MODE deployment completed!"
echo "📁 Files are now in $DEPLOY_DIR"
echo "🌐 App should be available at: https://$APP_NAME"