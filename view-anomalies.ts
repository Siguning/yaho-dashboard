import { Database } from "bun:sqlite";
import path from 'path';

const dbPath = path.resolve('local.db');
console.log(`Connecting to database at: ${dbPath}`);
const db = new Database(dbPath);

try {
    const query = db.query("SELECT * FROM anomalies");
    const results = query.all();
    console.log("Data found:");
    console.log(JSON.stringify(results, null, 2));
} catch (e) {
    console.error("Error querying database:", e);
}
