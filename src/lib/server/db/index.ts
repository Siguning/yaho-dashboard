import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const sqlitePath = env.DATABASE_URL || 'local.db';

let client;

if (!building) {
	client = new Database(sqlitePath);
} else {
	client = new Database(':memory:');
}

export const db = drizzle(client, { schema });
