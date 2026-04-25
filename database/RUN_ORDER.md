# Smart Disaster Response MIS — SQL Run Order Guide

## ✅ Step 4: SQL Files Already in Place
Your `database/` folder now contains:

| File | Purpose | Status |
|------|---------|--------|
| `ddl.sql` | Create all 20 tables + 10 indexes | ✅ Ready |
| `dml.sql` | Insert sample data (Citizen role, all FK references correct) | ✅ Ready |
| `txn1_resource_allocation.sql` | Step 5 — Resource allocation transaction | ✅ Ready |
| `txn2_donation_recording.sql` | Step 5 — Donation recording transaction | ✅ Ready |
| `txn3_procurement.sql` | Step 5 — Procurement 2-phase transaction | ✅ Ready |
| `txn4_event_closure.sql` | Step 5 — Disaster event closure transaction | ✅ Ready |
| `triggers.sql` | Step 6 — 9 triggers | ✅ Ready |
| `views.sql` | Step 7 — 6 role-specific views | ✅ Ready |
| `performance_benchmark.sql` | Step 7+8 — View vs raw join + Index benchmarks | ✅ Ready |

---

## 🚀 Run Order in SSMS

> ⚠️ **ALWAYS run scripts in this exact order. Never skip steps.**

### 1. Create the Database (do this once in SSMS)
```sql
CREATE DATABASE ProjectDB;
GO
USE ProjectDB;
GO
```

### 2. Run DDL (creates all 20 tables + 10 indexes)
```
File → Open → database\ddl.sql → Execute (F5)
```
Expected output: `DDL complete — 20 tables created, 10 indexes applied.`

### 3. Run DML (inserts sample data)
```
File → Open → database\dml.sql → Execute (F5)
```
Expected output: `DML complete — sample data inserted across all 20 tables.`

### 4. Run Triggers (Step 6)
```
File → Open → database\triggers.sql → Execute (F5)
```
Expected output: `All 9 triggers created and verified.`

> ⚠️ **Triggers MUST be created AFTER DML** — otherwise the Audit_Log triggers fire during sample data inserts and may reference missing records.

### 5. Run Transactions (Step 5)
```
File → Open → database\transactions.sql → Execute (F5)
```
Expected: Each transaction shows `COMMITTED` or `ROLLED BACK (expected)`.

### 6. Run Views (Step 7)
```
File → Open → database\views.sql → Execute (F5)
```
Expected: `6 role-specific views created and verified.`

### 7. Run Performance Benchmark (Step 7+8)
```
Switch SSMS to Results to Text: Ctrl+T
File → Open → database\performance_benchmark.sql → Execute (F5)
```
Copy the `CPU time` and `logical reads` from each block into your design rationale.

---

## 🔌 Backend API

### Start the server
```powershell
cd backend
npm start
```

### Verify DB connection
Open browser or Postman:
```
http://localhost:5000/api/health
```
Expected response:
```json
{
  "status": "ok",
  "database": "ProjectDB",
  "tableCounts": {
    "roles": 6,
    "users": 10,
    "citizens": 7,
    ...
  }
}
```

### Available API Endpoints
| Endpoint | View/Table Used | For |
|----------|----------------|-----|
| `GET /api/health` | All 20 tables | DB verification |
| `GET /api/dashboard` | `vw_AdminDashboard` | Admin |
| `GET /api/events` | `Disaster_Event` | Coordinator |
| `GET /api/reports` | `Emergency_Report` | All roles |
| `GET /api/teams` | `Rescue_Team` | Rescue Operator |
| `GET /api/inventory` | `vw_WarehouseManager_Inventory` | Warehouse Manager |
| `GET /api/finance` | `vw_FinanceOfficer_Summary` | Finance Officer |
| `GET /api/hospitals` | `vw_HospitalOccupancy` | Medical |
| `GET /api/field-reports` | `vw_FieldOfficer_ActiveReports` | Field Officer |
| `GET /api/coordinator-events` | `vw_DisasterCoordinator_ActiveEvents` | Coordinator |
| `GET /api/audit-log` | `Audit_Log` | Admin |

---

## 🐛 Common Issues

| Error | Fix |
|-------|-----|
| `Login failed for user 'TAHASOHAIL'` | Enable SQL Server Authentication in SSMS: Security → Logins → right-click user → Properties → enable |
| `Cannot open database ProjectDB` | Run `CREATE DATABASE ProjectDB;` in SSMS first |
| `Named Pipes Provider: Could not open a connection` | Make sure SQL Server service is running: Services → SQL Server (MSSQLSERVER) → Start |
| `Port 1433 blocked` | In SQL Server Configuration Manager, enable TCP/IP and set port to 1433 |
| Triggers fire during DML inserts | Always run dml.sql BEFORE triggers.sql |
