"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import TanstackProvider from "../../providers/TanstackProvider";
import { usePathname } from "next/navigation";
import CategoryProvider from "@/context/CategoryContext";
import SearchTextProvider from "@/context/SearchTextContext";
import NewFooter from "@/components/shared/Footer/NewFooter";
import { CartProvider } from "@/context/CartProvider";


export const metadata: Metadata = {
  title: "MENVERSE",
  description: "Designed and developed by Hridoy",
};

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div>
      {!pathname.startsWith("/admin") && (
        <>
          <CartProvider>
            <CategoryProvider>
              <SearchTextProvider>
                <TanstackProvider>
                  <div>
                    {(pathname.startsWith("/login") || pathname.startsWith("/success")) ? <></> : <Navbar />}
                    <div>{children}</div>
                    {(pathname.startsWith("/login") || pathname.startsWith("/success")) ? <></> : <NewFooter />}
                  </div>
                </TanstackProvider>
              </SearchTextProvider>
            </CategoryProvider>
          </CartProvider>
        </>
      )}
      {pathname.startsWith("/admin") && (
        <>
          <TanstackProvider>
            <div>{children}</div>
          </TanstackProvider>
        </>
      )}
    </div>
  );
}
