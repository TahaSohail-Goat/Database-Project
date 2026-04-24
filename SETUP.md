# 🚀 Project Setup Guide

This guide helps you set up the project with your own database credentials.

---

## 📋 Prerequisites

Before you start, you need:
1. **Node.js** installed (v16 or higher)
2. **SQL Server** running locally or on a server
3. **SQL Server Credentials** (username and password)
4. **Git** installed

---

## 🔧 Step-by-Step Setup

### Step 1: Clone the Repository
```powershell
git clone <repository-url>
cd DBProject
```

### Step 2: Install Dependencies

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd ../frontend
npm install
```

### Step 3: Configure Database Credentials

#### For Backend
Create a `.env` file in the `backend/` folder:

```powershell
cd backend
# Copy the example file
cp .env.example .env
```

Now **EDIT** the `.env` file with your credentials:

**Edit backend/.env:**
```env
# Database Configuration
DB_SERVER=localhost
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password
DB_DATABASE=ProjectDB
DB_PORT=1433

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Replace with YOUR values:**
- `your_sql_username` → Your SQL Server login username
- `your_sql_password` → Your SQL Server login password
- `localhost` → Change if your SQL Server is on a different server
- `ProjectDB` → Change if you want a different database name

#### For Frontend
Create a `.env.local` file in the `frontend/` folder:

```powershell
cd ../frontend
# Copy the example file
cp .env.example .env.local
```

**Edit frontend/.env.local:**
```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🗄️ Step 4: Create the Database

### Option A: Using SQL Server Management Studio (SSMS)
1. Open **SQL Server Management Studio**
2. Connect with your credentials
3. Go to **File** → **Open** → **File**
4. Select `database/ProjectDB.sql`
5. Click **Execute** (or press **F5**)

### Option B: Using Command Line
```powershell
sqlcmd -S localhost -U your_username -P your_password -i "database/ProjectDB.sql"
```

Replace:
- `your_username` → Your SQL Server username
- `your_password` → Your SQL Server password

### Option C: Programmatically (Recommended)
The database can also be created via Node.js when needed.

---

## ✅ Step 5: Verify Setup

### Test Database Connection
```powershell
cd backend
npm run test-db
```

**Expected Output:**
```
Testing SQL Server connection...
Server: localhost
Database: ProjectDB
User: your_username
Connected to SQL Server
✅ Connection test PASSED!
```

### Start the Backend Server
```powershell
npm start
```

You should see:
```
Connected to SQL Server
Server running on port 5000
```

### Start the Frontend
```powershell
cd ../frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📝 Environment Variables Explained

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `DB_SERVER` | SQL Server hostname/IP | `localhost` or `192.168.1.100` |
| `DB_USER` | SQL Server username | `sa` or `admin` |
| `DB_PASSWORD` | SQL Server password | `YourPassword123!` |
| `DB_DATABASE` | Database name | `ProjectDB` |
| `DB_PORT` | SQL Server port | `1433` (default) |
| `PORT` | Node.js server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🆘 Troubleshooting

### Connection Failed Error
**Problem:** `DB Connection Error: Login failed`

**Solutions:**
1. Check SQL Server is running
2. Verify username and password in `.env`
3. Check DB_SERVER is correct (use IP if localhost doesn't work)
4. Ensure SQL Server TCP/IP is enabled

### Database Already Exists
**Problem:** `Database ProjectDB already exists`

**Solution:** Delete the existing database and run the SQL script again, or just use the existing one.

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE :::5000`

**Solution:** Change `PORT` in `.env` to a different value (e.g., `5001`)

### SQL Script Won't Run
**Problem:** `sqlcmd not found` or permission denied

**Solution:**
1. Make sure SQL Server is installed
2. Add SQL Server tools to system PATH
3. Run PowerShell as Administrator

---

## 📁 Project Structure

```
DBProject/
├── backend/
│   ├── .env                 ← Your credentials (NOT in GitHub)
│   ├── .env.example         ← Template
│   ├── db.js               ← Database connection
│   ├── server.js           ← Express server
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── .env.local          ← Your API URL (NOT in GitHub)
│   ├── .env.example        ← Template
│   ├── app/
│   ├── package.json
│   └── node_modules/
├── database/
│   ├── ProjectDB.sql       ← Database schema
│   └── README.md
└── README.md
```

---

## 🔐 Security Reminders

✅ **DO:**
- Keep `.env` files locally only
- Share `.env.example` instead
- Change default passwords
- Use strong passwords

❌ **DON'T:**
- Commit `.env` files to GitHub
- Share your credentials
- Push `.env` to repositories
- Use default/weak passwords

---

## 🚀 Quick Commands

```powershell
# Backend
cd backend
npm install          # Install dependencies
npm start            # Start server
npm run test-db      # Test database connection

# Frontend  
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production

# Database
sqlcmd -S localhost -U username -P password -i "database/ProjectDB.sql"
```

---

## 📞 Getting Help

1. Check the troubleshooting section above
2. Verify your `.env` file has all required variables
3. Make sure SQL Server is running and accessible
4. Review error messages carefully - they usually indicate the issue

Happy coding! 🎉
