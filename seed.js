import Database from 'better-sqlite3';

// Point this to your actual database file path
// (Adjust the path if your db is somewhere else)
const db = new Database('../yaho-db-data/sqlite.db'); 

const anomalies = [
  {
    id: 'ANOM-001',
    name: ' The Static Walker',
    last_seen: '2025-12-10 23:42:00',
    author: 'Field Agent J. Doe',
    intelligence: 2,
    hostility: 4,
    risk: 3,
    description: 'A humanoid figure composed entirely of TV static. It roams abandoned subways and causes nearby electronics to display random integers. It does not speak but emits white noise that increases in volume as it approaches.',
    containment_protocol: 'Do not approach with digital devices. Use analog recording equipment only.'
  },
  {
    id: 'ANOM-002',
    name: 'Fractal Deer',
    last_seen: '2025-11-28 04:15:00',
    author: 'Ranger Smith',
    intelligence: 5,
    hostility: 1,
    risk: 2,
    description: 'A biological entity resembling a deer, but its antlers loop infinitely into themselves. It phases through solid matter like trees and fences. Staring at the antlers for too long causes mild vertigo.',
    containment_protocol: 'Observe from a distance. Do not attempt to feed; it consumes light.'
  },
  {
    id: 'ANOM-003',
    name: 'The Tuesday Rain',
    last_seen: '2025-12-05 14:00:00',
    author: 'Meteorologist Chen',
    intelligence: 0,
    hostility: 2,
    risk: 4,
    description: 'A localized weather phenomenon that only occurs on Tuesdays. The rain falls upwards and consists of saltwater. Exposure causes temporary loss of gravity for the victim.',
    containment_protocol: 'Wear weighted boots. Deploy umbrellas upside down.'
  },
  {
    id: 'ANOM-004',
    name: 'Echo of the Architect',
    last_seen: '2025-12-12 09:30:00',
    author: 'Dr. Racury',
    intelligence: 9,
    hostility: 0,
    risk: 5,
    description: 'A floating geometric shape that changes form every time it is blinked at. It attempts to communicate by rearranging nearby furniture into binary code patterns. Seemingly benevolent but accidentally destructive.',
    containment_protocol: 'Clear the room of loose objects. Engage in conversation using Morse code.'
  },
  {
    id: 'ANOM-005',
    name: 'Midnight Bus',
    last_seen: '2025-10-31 00:00:00',
    author: 'Traffic Cam 44',
    intelligence: 3,
    hostility: 8,
    risk: 5,
    description: 'A bus that appears on empty highways at exactly midnight. It has no driver, and the passengers appear to be mannequins that change positions when not observed. It attempts to run off the road anyone who follows it.',
    containment_protocol: 'Do not overtake. Take the nearest exit immediately.'
  }
];

// SQL Statement
const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO anomalies (id, name, last_seen, author, intelligence, hostility, risk, description, containment_protocol)
  VALUES (@id, @name, @last_seen, @author, @intelligence, @hostility, @risk, @description, @containment_protocol)
`);

console.log('🌱 Seeding anomalies...');

const run = db.transaction((data) => {
  for (const anomaly of data) {
    insertStmt.run(anomaly);
    console.log(`Inserted: ${anomaly.name}`);
  }
});

run(anomalies);
console.log('✅ Done!');
