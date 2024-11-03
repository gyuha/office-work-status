import { Hono } from "hono";

export const configController = new Hono();

configController.get("/", (c) => {
    if (c.req.cookie("auth") !== "true") {
        return c.redirect("/");
    }
    return c.html(
        '<!DOCTYPE html><html><head><title>Config</title></head><body><div id="config"></div><script src="/public/js/config.js"></script></body></html>'
    );
});

configController.post("/", async (c) => {
    const { token, password } = await c.req.json();
    // SQLite에 저장 로직 추가
    return c.json({ result: true });
});
