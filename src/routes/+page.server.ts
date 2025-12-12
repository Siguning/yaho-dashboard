import { db } from '$lib/server/db';
import { anomalies } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('id') || 'ANOM-001';

	const anomaly = await db.query.anomalies.findFirst({
		where: eq(anomalies.id, id)
	});

	if (!anomaly) {
		throw error(404, 'Anomaly not found');
	}

	const sidebarAnomalies = await db.select().from(anomalies).orderBy(sql`RANDOM()`).limit(3);

	return {
		objectData: {
			id: anomaly.id,
			name: anomaly.name,
			lastSeen: anomaly.lastSeen,
			author: anomaly.author,
			stats: {
				intelligence: anomaly.intelligence,
				hostility: anomaly.hostility,
				risk: anomaly.risk
			},
			description: anomaly.description,
			containmentProtocol: anomaly.containmentProtocol
		},
		sidebarAnomalies
	};
};
