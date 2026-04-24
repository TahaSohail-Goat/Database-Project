require("dotenv").config();

/**
 * Configuration validator
 * Checks if all required environment variables are set
 */

const requiredVars = {
    DB_SERVER: "SQL Server hostname/IP",
    DB_USER: "SQL Server username",
    DB_PASSWORD: "SQL Server password",
    DB_DATABASE: "Database name",
    PORT: "Application port"
};

const missingVars = [];

console.log("\n📋 Configuration Check\n");
console.log("━".repeat(50));

for (const [varName, description] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    if (!value) {
        missingVars.push(varName);
        console.log(`❌ ${varName}: NOT SET`);
    } else {
        const displayValue = varName === "DB_PASSWORD" ? "***" : value;
        console.log(`✅ ${varName}: ${displayValue}`);
    }
}

console.log("━".repeat(50));

if (missingVars.length > 0) {
    console.error(`\n⚠️  Missing ${missingVars.length} required environment variable(s):\n`);
    missingVars.forEach(v => {
        console.error(`   - ${v}`);
    });
    console.error("\n📝 Please set these in your .env file and try again.\n");
    process.exit(1);
} else {
    console.log("\n✅ All required variables are configured!\n");
    process.exit(0);
}
