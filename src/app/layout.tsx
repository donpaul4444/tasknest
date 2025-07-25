'use client'
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>

        <Providers>
          {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
