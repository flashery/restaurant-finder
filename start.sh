#!/bin/bash

set -e

echo "🔧 Checking .env files..."

# Backend env setup
if [ ! -f backend/.env ]; then
  echo "📄 Creating backend/.env from example"
  cp backend/env.example backend/.env
else
  echo "✅ backend/.env already exists."
fi

# Frontend env setup
if [ ! -f frontend/.env ]; then
  echo "📄 Creating frontend/.env from example"
  cp frontend/env.example frontend/.env
else
  echo "✅ frontend/.env already exists."
fi


# 🧠 Auto-detect correct docker-compose command
if command -v docker compose &> /dev/null; then
  DC="docker compose"
elif command -v docker-compose &> /dev/null; then
  DC="docker-compose"
else
  echo "❌ Docker Compose is not installed."
  exit 1
fi

echo "🧹 Stopping any running containers..."
$DC down

# Inject secrets into backend/.env
FOURSQUARE_API_KEY=$(aws ssm get-parameter --name "/restaurant-finder/backend/FOURSQUARE_API_KEY" --with-decryption --query "Parameter.Value" --output text)
OPENAI_API_KEY=$(aws ssm get-parameter --name "/restaurant-finder/backend/OPENAI_API_KEY" --with-decryption --query "Parameter.Value" --output text)

# Replace or append in .env safely
sed -i "/^FOURSQUARE_API_KEY=/d" backend/.env
echo -e "\nFOURSQUARE_API_KEY=$FOURSQUARE_API_KEY" >> backend/.env

sed -i "/^OPENAI_API_KEY=/d" backend/.env
echo -e "OPENAI_API_KEY=$OPENAI_API_KEY" >> backend/.env

echo "🔨 Building Docker images (no cache)..."
$DC build --no-cache

echo "🚀 Starting Docker containers..."
$DC up
