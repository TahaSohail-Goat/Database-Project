# Database-Project

A full-stack web application with Express backend and Next.js frontend, connected to SQL Server.

## 🚀 Quick Start

### For First-Time Setup
Read the complete setup guide: [SETUP.md](SETUP.md)

### Quick Commands
```powershell
# Backend setup
cd backend
npm install
npm run test-db      # Test database connection
npm start            # Start server

# Frontend setup
cd frontend
npm install
npm run dev          # Start development
```

## 📋 Prerequisites
- Node.js v16+
- SQL Server (local or remote)
- SQL Server credentials

## 🔧 Configuration

### Backend (.env)
```env
DB_SERVER=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=ProjectDB
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

⚠️ **Important:** Never commit `.env` files to GitHub!

## 📁 Project Structure
```
├── backend/          (Express + SQL Server)
├── frontend/         (Next.js)
└── database/         (SQL scripts)
```

## 📖 Documentation
- [SETUP.md](SETUP.md) - Complete setup guide
- [database/README.md](database/README.md) - Database schema details

## 🆘 Need Help?
See the [SETUP.md](SETUP.md) troubleshooting section.
