import { h } from "hono/jsx";
import { Layout } from "./layout";

export const Config = () => (
    <Layout>
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold">Config</h1>
            <form id="config-form">
                <div>
                    <label>Office 365 Token</label>
                    <input type="text" name="token" class="border p-2" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" class="border p-2" />
                </div>
                <button type="submit" class="bg-blue-500 text-white p-2">
                    Save
                </button>
            </form>
        </div>
    </Layout>
);
