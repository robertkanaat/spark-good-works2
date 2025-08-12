#!/usr/bin/env bash

echo "Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "Running react-snap for pre-rendering..."
  npx react-snap
  if [ $? -eq 0 ]; then
    echo "✅ Build and pre-rendering completed successfully!"
  else
    echo "❌ Pre-rendering failed, but build succeeded"
    exit 1
  fi
else
  echo "❌ Build failed"
  exit 1
fi