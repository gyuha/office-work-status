import { Database } from "bun:sqlite";

const db = new Database("events.db");

// 테이블 생성
db.run(`
    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        subject TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL
    )
`);

export interface Event {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
}

export function insertEvent(event: Event) {
  const stmt = db.prepare(`
        INSERT OR REPLACE INTO events (id, subject, start_time, end_time)
        VALUES (?, ?, ?, ?)
    `);

  stmt.run(event.id, event.subject, event.startTime, event.endTime);
}

export function getTodayEvents(): Event[] {
  const today = new Date().toISOString().split("T")[0];

  const stmt = db.prepare(`
        SELECT id, subject, start_time, end_time
        FROM events
        WHERE date(start_time) = ?
        ORDER BY start_time ASC
    `);

  const rows = stmt.all(today) as any[];

  return rows.map((row) => ({
    id: row.id,
    subject: row.subject,
    startTime: row.start_time,
    endTime: row.end_time,
  }));
}

// 오래된 이벤트 정리
export function cleanupOldEvents() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const stmt = db.prepare(`
        DELETE FROM events
        WHERE date(end_time) < ?
    `);

  stmt.run(thirtyDaysAgo.toISOString().split("T")[0]);
}
