import { Hono } from "hono";
import { jsx } from "hono/jsx";
import Layout from "../views/layout";
import ConfigView from "../views/configView";
import { saveToken } from "../models/tokenModel";

export const ConfigController = new Hono();

// 인증 미들웨어
ConfigController.use("*", async (c, next) => {
    const auth = c.req.headers.get("Authorization");
    if (auth === "Basic " + btoa("admin:qwer1234")) {
        await next();
    } else {
        c.res.headers.set(
            "WWW-Authenticate",
            'Basic realm="User Visible Realm"'
        );
        return c.text("Unauthorized", 401);
    }
});

ConfigController.get("/", (c) => {
    return c.html(
        <Layout>
            <ConfigView />
        </Layout>
    );
});

ConfigController.post("/", async (c) => {
    const body = await c.req.parseBody();
    const token = body["token"];
    await saveToken(token);
    return c.redirect("/");
});
