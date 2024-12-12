import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./layout.client";

export const metadata: Metadata = {
    title: "MENVERSE",
    description: "Designed and developed by Hridoy",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <link
                    href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
                    rel="stylesheet"
                ></link>
                <script
                    async
                    defer
                    src="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
                    ></script>
            </head>
            <body className="scroll-container">
                <LayoutClient>{children}</LayoutClient>
            </body>
        </html>
    );
}
