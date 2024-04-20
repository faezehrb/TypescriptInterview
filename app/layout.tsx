import type { Metadata } from "next";
 
import "./globals.css";

export const metadata: Metadata = {
  title: "Co Test",
  description: "TS Sample In Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
