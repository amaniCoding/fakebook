import type { Metadata } from "next";
import "./globals.css";
import App from "./app";

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
      <App>{children}</App>
    </html>
  );
}
