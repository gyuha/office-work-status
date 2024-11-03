import { h } from "hono/jsx";

export const Layout = ({ children }) => (
    <html>
        <head>
            <title>My Schedule App</title>
            <link
                href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
                rel="stylesheet"
            />
        </head>
        <body class="bg-gray-100">{children}</body>
    </html>
);
