import type { Context } from "hono";
import { fetchEvents } from "../models/office365Model";
import { renderScheduleView } from "../views/scheduleView";

export async function schedulePage(c: Context) {
    const events = await fetchEvents();
    const now = new Date();

    let content = "";

    if (events.length > 0) {
        // 현재 시간의 일정 확인
        const currentEvent = events.find((event) => {
            const start = new Date(event.start.dateTime);
            const end = new Date(event.end.dateTime);
            return now >= start && now <= end;
        });

        if (currentEvent) {
            // 현재 일정 표시
            content = `<h1 class="text-xl font-bold">현재 일정: ${currentEvent.subject}</h1>`;
        } else {
            // 오늘의 일정 표시
            content = `<h1 class="text-xl font-bold">오늘의 일정 목록</h1>`;
            events.forEach((event) => {
                content += `<p>${event.start.dateTime} - ${event.subject}</p>`;
            });
        }
    } else {
        // 일정이 없을 경우
        const day = now.getDay();
        if (day >= 1 && day <= 5) {
            content = `<h1 class="text-xl font-bold">근무 중</h1>`;
        } else {
            content = `<h1 class="text-xl font-bold">휴무</h1>`;
        }
    }

    return renderScheduleView(c, content);
}
