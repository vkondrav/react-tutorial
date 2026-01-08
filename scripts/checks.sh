#!/bin/bash

# Shared checks script used by pre-commit hook and CI
# Run from repository root

set -e

cd playground

echo "📝 Checking formatting..."
npm run format:check

echo "🔍 Checking linting..."
npm run lint:check

echo "🧪 Running tests..."
npm run test

echo "✅ All checks passed!"
