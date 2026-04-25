const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "localhost",
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    connectionTimeout: 30000,
    requestTimeout: 30000
};

let pool = null;

const connectDB = async () => {
    try {
        pool = await sql.connect(config);
        console.log(`✅ Connected to SQL Server — database: ${process.env.DB_DATABASE}`);
        return pool;
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
};

const getPool = () => {
    if (!pool) throw new Error("DB pool not initialized. Call connectDB() first.");
    return pool;
};

module.exports = { sql, connectDB, getPool };