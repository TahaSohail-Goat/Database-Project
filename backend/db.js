const sql = require("mssql");

const config = {
    user: "TAHASOHAIL",
    password: "1234",
    server: "localhost",
    database: "CDIEM",
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