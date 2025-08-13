'use client'
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { useUIStore } from "@/store/uiStore"
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const setOpenDropdownId = useUIStore((state) => state.setOpenDropdownId)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (!target.closest("[data-dropdown-id]")) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [setOpenDropdownId])

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
