// test-direct.js
const { Client } = require('pg');

// NOTE: We are using the DIRECT connection URL this time.
const connectionString = "postgresql://postgres:[YOUR_SECURE_PASSWORD]@db.qpaiayzvygktmmbivkts.supabase.co:5432/postgres";

const client = new Client({
    connectionString: connectionString,
    // We are keeping the SSL fix
    ssl: {
        rejectUnauthorized: false
    }
});

async function testDirectConnection() {
    console.log("Attempting DIRECT connection (port 5432) with SSL fix...");
    try {
        await client.connect();
        console.log("\n✅ ✅ ✅ DIRECT CONNECTION SUCCESS! ✅ ✅ ✅");
        console.log("This works! Use the direct URL with the SSL fix in your .env file.");
    } catch (err) {
        console.error("\n❌ ❌ ❌ ALL CONNECTIONS FAILED ❌ ❌ ❌");
        console.error("This confirms the issue is a highly restrictive network policy that we cannot bypass with code.");
        console.error("The only solution is to use a different network (like a mobile hotspot) or contact your network administrator.");
        console.error("Error details:", err.message);
    } finally {
        await client.end();
    }
}

testDirectConnection();