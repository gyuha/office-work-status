import { Database } from "bun:sqlite";

const db = new Database("tokens.db");

db.run(
    "CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY, token TEXT)"
);

export async function saveToken(token: string) {
    db.run("INSERT INTO tokens (token) VALUES (?)", token);
}

export function getToken(): string | null {
    const row = db
        .query("SELECT token FROM tokens ORDER BY id DESC LIMIT 1")
        .get();
    return row ? row.token : null;
}
