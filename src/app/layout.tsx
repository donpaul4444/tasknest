'use client'
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

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
               <Toaster position="top-center" reverseOrder={false} />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
