import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./app-provider";

export const metadata: Metadata = {
  title: "Fakebook",
  description: "Created by Amanuel Ferede",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
