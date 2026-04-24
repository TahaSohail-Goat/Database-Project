require("dotenv").config();
const { sql, connectDB } = require("./db");

async function testConnection() {
    console.log("Testing SQL Server connection...");
    console.log("Server:", process.env.DB_SERVER);
    console.log("Database:", process.env.DB_DATABASE);
    console.log("User:", process.env.DB_USER);
    
    try {
        await connectDB();
        console.log("✅ Connection test PASSED!");
        console.log("Server is running and database is accessible.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection test FAILED!");
        console.error("Error:", err.message);
        process.exit(1);
    }
}

testConnection();
