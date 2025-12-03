import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	age: integer('age')
});

export const anomalies = sqliteTable('anomalies', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	lastSeen: text('last_seen').notNull(),
	author: text('author').notNull(),
	intelligence: integer('intelligence').notNull(),
	hostility: integer('hostility').notNull(),
	risk: integer('risk').notNull(),
	description: text('description'),
	containmentProtocol: text('containment_protocol')
});
