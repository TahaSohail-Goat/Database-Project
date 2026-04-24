# Database Setup Guide

## Overview
This folder contains all SQL scripts for setting up the database.

## Files
- **ProjectDB.sql** - Main database initialization script

---

## 🔄 Using a Different Database Name

By default, the script creates a database named `ProjectDB`. To use a different name:

### Step 1: Edit the SQL Script
1. Open `ProjectDB.sql` in a text editor
2. Find the first line: `CREATE DATABASE ProjectDB`
3. Change it to your database name:
   ```sql
   CREATE DATABASE MyCustomDB
   ```

### Step 2: Update Your Configuration
1. Edit `backend/.env`
2. Change `DB_DATABASE=ProjectDB` to `DB_DATABASE=MyCustomDB`

### Step 3: Run the Script
Then run the SQL script as normal.

---

## How to Run

### Option 1: SQL Server Management Studio (SSMS)
1. Open SQL Server Management Studio
2. Connect with your credentials
3. File → Open → Select `ProjectDB.sql`
4. Click Execute (or press F5)

### Option 2: Command Line (PowerShell)
Replace username and password with your SQL Server credentials:
```powershell
sqlcmd -S localhost -U your_username -P your_password -i "database/ProjectDB.sql"
```

### Option 3: From Node.js Application
Test the connection:
```powershell
cd backend
npm run test-db
```

---

## Database Schema

### Users Table
- UserID (Primary Key) - Auto-increment
- FirstName - User first name
- LastName - User last name
- Email - Unique email address
- Phone - Contact number
- CreatedAt - Auto-timestamp
- UpdatedAt - Auto-timestamp

### Projects Table
- ProjectID (Primary Key) - Auto-increment
- ProjectName - Project title
- Description - Project details
- UserID (Foreign Key) - Links to Users
- Status - Active/Inactive/Completed
- StartDate - Project start date
- EndDate - Project end date
- CreatedAt - Auto-timestamp
- UpdatedAt - Auto-timestamp

### Tasks Table
- TaskID (Primary Key) - Auto-increment
- ProjectID (Foreign Key) - Links to Projects
- TaskName - Task title
- Description - Task details
- Status - Pending/In Progress/Completed
- Priority - Low/Medium/High
- AssignedTo (Foreign Key) - Links to Users
- DueDate - Task due date
- CreatedAt - Auto-timestamp
- UpdatedAt - Auto-timestamp

---

## Relationships

```
Users (1) ──→ (Many) Projects
  ↓
  └──→ (Many) Tasks (AssignedTo)

Projects (1) ──→ (Many) Tasks
```

---

## Sample Data

The script includes default sample data:
- **3 Sample Users**: John Doe, Jane Smith, Alice Johnson
- **2 Sample Projects**: Project Alpha, Project Beta
- **3 Sample Tasks**: Setup Database, Create API Endpoints, Frontend Design

You can delete this data and add your own after creating the database.

---

## ⚠️ Important Notes

- The script includes `IF NOT EXISTS` checks to prevent errors if you run it multiple times
- All tables have timestamps (CreatedAt, UpdatedAt)
- Foreign keys ensure data integrity
- Sample data is pre-populated but can be easily deleted

- 3 sample tasks

## Environment Configuration
Make sure your `.env` file has:
```
DB_SERVER=localhost
DB_USER=TAHASOHAIL
DB_PASSWORD=1234
DB_DATABASE=ProjectDB
```
