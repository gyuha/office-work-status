import { Hono } from "hono";

export const authController = new Hono();

authController.post("/", async (c) => {
    const { password } = await c.req.json();
    if (password === "admin") {
        c.cookie("auth", "true");
        return c.json({ result: true });
    }
    return c.json({ result: false });
});
