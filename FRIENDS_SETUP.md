# 👥 Setup Guide for Friends

Follow these simple steps to set up the project with your own database.

---

## 📝 Step 1: Copy the Example Files

In the `backend/` folder:
1. Find the file `.env.example`
2. Make a copy and rename it to `.env`
3. **Edit the `.env` file** with your values

```
❌ .env.example  (don't edit this)
✅ .env          (copy & edit this)
```

---

## 🔐 Step 2: Fill in Your Database Credentials

**Edit `backend/.env`** and replace with YOUR SQL Server details:

```env
DB_SERVER=localhost           ← Change if SQL Server is on different PC
DB_USER=your_sql_username     ← Your SQL login username
DB_PASSWORD=your_sql_password ← Your SQL login password
DB_DATABASE=ProjectDB         ← You can keep this or change it
PORT=5000                     ← Keep as is (or change if 5000 is taken)
NODE_ENV=development          ← Keep as is
```

**Example (if your SQL login is "admin" with password "abc123"):**
```env
DB_SERVER=localhost
DB_USER=admin
DB_PASSWORD=abc123
DB_DATABASE=ProjectDB
PORT=5000
NODE_ENV=development
```

---

## 📝 Step 3: Copy Frontend Config

In the `frontend/` folder:
1. Find the file `.env.example`
2. Make a copy and rename it to `.env.local`
3. Leave it as is (or change localhost if backend is on different PC)

```
❌ .env.example   (don't edit this)
✅ .env.local     (copy it)
```

---

## 🗄️ Step 4: Create the Database

Open **SQL Server Management Studio** and run the SQL script:

1. Open **SQL Server Management Studio**
2. **File** → **Open** → **File**
3. Select `database/ProjectDB.sql`
4. Click **Execute** (or press **F5**)

---

## ✅ Step 5: Test Everything

Open PowerShell and run:

```powershell
cd backend
npm install        # Install dependencies
npm run check-config   # Check your configuration
npm run test-db    # Test database connection
npm start          # Start the server
```

**If you see:**
```
✅ Connected to SQL Server
✅ Server running on port 5000
```

You're all set! 🎉

---

## 🆘 Common Issues

### Issue: "DB Connection Error: Login failed"
**Fix:** Check your username and password in `.env`

### Issue: "Cannot find module mssql"
**Fix:** Run `npm install` in the `backend/` folder

### Issue: "Port 5000 already in use"
**Fix:** In `.env` change `PORT=5000` to `PORT=5001`

### Issue: "Database ProjectDB already exists"
**Fix:** That's fine! You can keep using it or delete it first

---

## 🚀 Now What?

- **Backend:** `npm start` in backend folder
- **Frontend:** `npm run dev` in frontend folder
- **Website:** Go to `http://localhost:3000`

You're ready to develop! 🎉

---

**Questions?** Check the full [SETUP.md](../SETUP.md)
