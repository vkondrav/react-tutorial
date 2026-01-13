#!/bin/bash

# Shared checks script used by pre-commit hook and CI
# Run from repository root

set -e

cd playground

echo "📝 Checking formatting..."
npm run format:check

echo "🔍 Checking linting..."
npm run lint:check

echo "🔷 Type checking..."
npm run typecheck

echo "🏗️  Building..."
npm run build

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "✅ All checks passed!"
