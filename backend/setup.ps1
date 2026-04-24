#!/bin/bash
# Quick setup script for Windows (PowerShell)

Write-Host "🚀 Quick Project Setup" -ForegroundColor Green
Write-Host "=====================`n"

# Check if .env exists
if (-Not (Test-Path "backend/.env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Please create backend/.env from backend/.env.example`n" -ForegroundColor Yellow
    exit 1
}

# Check Node modules
Write-Host "📦 Installing Backend Dependencies..."
cd backend
if (-Not (Test-Path "node_modules")) {
    npm install
}

Write-Host "`n✅ Checking Configuration..." -ForegroundColor Green
npm run check-config
if ($LASTEXITCODE -ne 0) {
    Write-Host "Fix the configuration and try again" -ForegroundColor Red
    exit 1
}

Write-Host "`n🔌 Testing Database Connection..." -ForegroundColor Green
npm run test-db
if ($LASTEXITCODE -ne 0) {
    Write-Host "Database connection failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "🚀 Run 'npm start' to start the backend server" -ForegroundColor Cyan
