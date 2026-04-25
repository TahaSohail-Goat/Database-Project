const sql = require("mssql");

const config = {
    user: "Artfever",
    password: "1010",
    server: "localhost",
    database: "DBPROJECT",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
};

module.exports = { sql, connectDB };