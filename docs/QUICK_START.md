# ⚡ Quick Reference - For Your Friends

## 1️⃣ Create `.env` File

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
DB_SERVER=localhost
DB_USER=your_username         ← YOUR SQL username
DB_PASSWORD=your_password     ← YOUR SQL password
DB_DATABASE=ProjectDB         ← Change if you want different name
PORT=5000
NODE_ENV=development
```

## 2️⃣ Create `.env.local` File

Copy `frontend/.env.example` to `frontend/.env.local`

(You can leave it as is)

## 3️⃣ Run the SQL Script

Open **SQL Server Management Studio**:
1. File → Open → `database/ProjectDB.sql`
2. Press **F5** to Execute

---

## 4️⃣ Install & Test

```powershell
cd backend
npm install
npm run test-db      # Should see ✅ Connected to SQL Server
```

## 5️⃣ Start the Application

```powershell
# Backend (in backend folder)
npm start

# Frontend (in another terminal, in frontend folder)
npm run dev
```

---

## 📝 Customizing Database Name

Want to use a different database name?

1. Edit `database/ProjectDB.sql`
2. Change line 2 from `CREATE DATABASE ProjectDB` to:
   ```sql
   CREATE DATABASE YourDatabaseName
   ```
3. In `backend/.env`, change `DB_DATABASE=ProjectDB` to `DB_DATABASE=YourDatabaseName`
4. Run the SQL script

---

## 🆘 Common Issues

| Issue | Fix |
|-------|-----|
| "Login failed" | Check username/password in `.env` |
| "Port 5000 in use" | Change `PORT=5000` to `PORT=5001` in `.env` |
| "Cannot find module" | Run `npm install` in backend folder |
| "Cannot connect to server" | Make sure SQL Server is running |

---

## ✅ Files to Create (from examples)

```
backend/.env          ← from .env.example (fill with YOUR credentials)
frontend/.env.local   ← from .env.example (copy as is)
```

---

## 📁 What NOT to Share

❌ `.env` files (contains passwords)
❌ `.node_modules` folder (will be auto-installed)
❌ `.next` folder (built files)

✅ Share `backend/.env.example` instead

---

**That's it! You're ready to go!** 🚀
