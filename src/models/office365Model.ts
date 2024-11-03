// src/models/office365Model.ts
import { openDb } from "./db";

interface Event {
    subject: string;
    start: { dateTime: string };
    end: { dateTime: string };
}

export async function getAccessToken(): Promise<string | null> {
    const db = await openDb();
    const row = await db.get<{ token: string }>(
        "SELECT token FROM tokens WHERE id = 1"
    );
    return row ? row.token : null;
}

export async function fetchEvents(): Promise<Event[]> {
    const accessToken = await getAccessToken();
    if (!accessToken) return [];

    const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data.value || [];
}
