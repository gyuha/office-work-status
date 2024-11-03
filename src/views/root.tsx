import { h } from "hono/jsx";
import { Layout } from "./layout";

export const Root = () => (
    <Layout>
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold">My Schedule</h1>
            <div id="scedule"></div>
        </div>
    </Layout>
);
