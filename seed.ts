import { Database } from "bun:sqlite";
import path from 'path';

const dbPath = path.resolve('local.db');
console.log(`Connecting to database at: ${dbPath}`);
const db = new Database(dbPath);

const anomalies = [
    {
        id: '082',
        name: 'The Weeping Shadow',
        lastSeen: '2025.12.03',
        author: 'Dr. Kim',
        intelligence: 2,
        hostility: 4,
        risk: 1,
        description: 'YAHO-082는 부정형의 그림자 형태를 띠고 있으며, 광원이 없는 구석에서 주로 발견된다. 초기 발견 시 단순한 그림자 현상으로 오인되었으나, 탐사대원의 그림자와 융합하여 질식시키는 패턴이 확인되었다.\\n\\n물리적인 타격은 통하지 않으나, 500루멘 이상의 강한 빛에는 일시적으로 무력화된다.',
        containmentProtocol: '<li>항시 4면의 조명이 켜진 5x5m 격리실에 보관.</li><li>진입 시 최소 2인 1조로 행동하며 휴대용 투광기 지참 필수.</li><li>그림자가 길어지는 시간대(오후 4시~6시)에 격리실 접근 금지.</li><li><span class="text-red-400 bg-red-950/30 px-1">절대 말을 걸지 말 것.</span></li>'
    },
    {
        id: '079',
        name: 'Static Noise',
        lastSeen: '2024.11.15',
        author: 'Agent Lee',
        intelligence: 0,
        hostility: 1,
        risk: 2,
        description: '오래된 브라운관 TV에서 발생하는 백색 소음과 유사한 청각적 변칙 개체. 반경 10m 내의 모든 전자기기 화면에 노이즈를 발생시키며, 장시간 노출 시 심각한 두통과 환청을 유발한다.',
        containmentProtocol: '<li>방음 처리된 납 코팅 격리실에 보관.</li><li>반경 20m 내 전자기기 반입 금지.</li><li>주 1회 소음 측정 실시.</li>'
    },
    {
        id: '104',
        name: 'Red Sun',
        lastSeen: 'Unknown',
        author: 'O5-1',
        intelligence: 4,
        hostility: 0,
        risk: 4,
        description: '직경 3m의 붉은 구체로, 공중에 부양해 있다. 주변의 현실성을 왜곡시키며, 이를 바라보는 자에게 알 수 없는 지식을 주입한다. 물리적 접촉 시 대상은 소멸한다.',
        containmentProtocol: '<li>제7기지 최하층 격리 구역에 보관.</li><li>직접적인 시각적 접촉 금지 (카메라 필터 사용 필수).</li><li>접근 인원은 4등급 이상 보안 인가 필요.</li>'
    },
    {
        id: '237',
        name: 'Corridor of Whispers',
        lastSeen: '2025.01.20',
        author: 'Dr. Park',
        intelligence: 1,
        hostility: 2,
        risk: 2,
        description: '끝이 보이지 않는 복도 형태의 공간 변칙. 진입한 자의 과거 기억을 속삭이며 정신을 혼란스럽게 한다. 일정 깊이 이상 진입하면 돌아올 수 없다.',
        containmentProtocol: '<li>입구 봉쇄 및 경비 인원 배치.</li><li>탐사 시 로프 연결 필수.</li><li>100m 이상 진입 금지.</li>'
    },
    {
        id: '555',
        name: 'Infinite Staircase',
        lastSeen: '2023.05.05',
        author: 'Surveyor Team 4',
        intelligence: 0,
        hostility: 0,
        risk: 1,
        description: '끝없이 이어지는 나선형 계단. 내려갈수록 기온이 낮아지며, 올라갈수록 기압이 낮아진다. 계단 중간중간에 알 수 없는 문들이 존재한다.',
        containmentProtocol: '<li>입구 폐쇄.</li><li>허가 없는 진입 시 즉시 구금.</li>'
    },
    {
        id: '999',
        name: 'The Glitch',
        lastSeen: '2025.12.01',
        author: 'SysAdmin',
        intelligence: 3,
        hostility: 3,
        risk: 3,
        description: '현실 세계의 텍스처가 깨진 듯한 형상의 인간형 개체. 접촉한 물체의 물성을 무작위로 변환시킨다. (예: 강철을 물처럼, 물을 강철처럼)',
        containmentProtocol: '<li>특수 강화 유리 격리실 사용.</li><li>격리실 내부 주기적 초기화(포맷) 필요.</li>'
    },
    {
        id: '013',
        name: 'The Mirror Man',
        lastSeen: '2025.10.31',
        author: 'Dr. Choi',
        intelligence: 3,
        hostility: 4,
        risk: 3,
        description: '거울 속에서만 존재하는 인간형 개체. 거울을 보는 사람의 모습을 흉내 내다가, 대상이 방심한 틈을 타 거울 밖으로 끌고 들어간다.',
        containmentProtocol: '<li>기지 내 모든 거울 제거.</li><li>반사 재질의 물체 반입 주의.</li><li>개체 출현 시 즉시 거울 파괴.</li>'
    },
    {
        id: '404',
        name: 'Not Found',
        lastSeen: 'Always',
        author: 'System',
        intelligence: 4,
        hostility: 0,
        risk: 0,
        description: '존재하지 않는 데이터. 시스템 오류 혹은 삭제된 기록의 잔재.',
        containmentProtocol: '<li>데이터 복구 시도 금지.</li><li>시스템 재부팅 권장.</li>'
    }
];

const insert = db.prepare(`
    INSERT OR REPLACE INTO anomalies (id, name, last_seen, author, intelligence, hostility, risk, description, containment_protocol)
    VALUES ($id, $name, $lastSeen, $author, $intelligence, $hostility, $risk, $description, $containmentProtocol)
`);

const insertMany = db.transaction(anomalies => {
    for (const anomaly of anomalies) insert.run({
        $id: anomaly.id,
        $name: anomaly.name,
        $lastSeen: anomaly.lastSeen,
        $author: anomaly.author,
        $intelligence: anomaly.intelligence,
        $hostility: anomaly.hostility,
        $risk: anomaly.risk,
        $description: anomaly.description,
        $containmentProtocol: anomaly.containmentProtocol
    });
});

try {
    insertMany(anomalies);
    console.log(`Successfully seeded ${anomalies.length} anomalies.`);
} catch (e) {
    console.error("Error seeding database:", e);
}
