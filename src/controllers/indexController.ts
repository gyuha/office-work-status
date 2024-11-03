import { Hono } from "hono";
import { jsx } from "hono/jsx";
import { getSchedule } from "../models/scheduleModel";
import Layout from "../views/layout";
import IndexView from "../views/indexView";

export const IndexController = new Hono();

IndexController.get("/", async (c) => {
    const schedule = await getSchedule();
    return c.html(
        <Layout>
            <IndexView schedule={schedule} />
        </Layout>
    );
});
