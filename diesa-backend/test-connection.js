// test-connection.js (v2 - with SSL fix)
const { Client } = require('pg');

// Use your secure password here.
const connectionString = "postgresql://postgres.qpaiayzvygktmmbivkts:[Test123ijklnugtfthgv]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new Client({
    connectionString: connectionString,
    // This is the new line that fixes the certificate error
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    console.log("Attempting to connect with SSL fix...");
    try {
        await client.connect();
        console.log("\n✅ ✅ ✅ SUCCESS! ✅ ✅ ✅");
        console.log("The connection to the database was successful!");
        console.log("This PROVES your computer can reach Supabase.");
        console.log("Now, apply the equivalent fix to your .env file for Prisma.");
    } catch (err) {
        console.error("\n❌ ❌ ❌ CONNECTION FAILED AGAIN ❌ ❌ ❌");
        console.error("This is very unusual. The problem might be a highly restrictive network policy.");
        console.error("Error details:", err.message);
    } finally {
        await client.end();
    }
}

testConnection();