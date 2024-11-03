import { Hono } from "hono";

export const scheduleController = new Hono();

scheduleController.get("/", async (c) => {
    // Office 365 API 호출 로직 추가
    const schedule = {
        result: true,
        status: "working",
        datetime: new Date().toISOString(),
    };
    return c.json(schedule);
});
