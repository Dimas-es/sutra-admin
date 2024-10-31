'use client'
import {Outfit} from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from "next/navigation";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  const params=usePathname();
  const showHeader=params=='/sign-in'||params=='/create-account'?false:true;
  return (
    <html lang="id">
      <body
        className={outfit.className}
      >
        {showHeader&&<Header/>}
        {children}
         <Toaster />
      </body>
    </html>
  );
}
