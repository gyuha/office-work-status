const Layout = ({ children }) => (
    <html>
        <head>
            <meta charSet="UTF-8" />
            <title>Office 365 일정</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100">{children}</body>
    </html>
);

export default Layout;
