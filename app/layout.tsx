import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SheetCustom from "@/components/Custom/SheetCustom";
import SideMenuBar from "@/components/Custom/SideMenuBar";
import { Suspense } from 'react'
import AuthProvider from "@/components/providers/AuthProvider";
import WebsocketProvider from "@/components/providers/WebsocketProvider";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast";
import ClientApplication from "@/components/providers/ClientApplication";
import {Oval} from "react-loader-spinner"
import MenuLoader from "@/components/Custom/MenuLoader";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "cabshare",
  description: "share cab and save money :)",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ToastProvider>
          <body className={`${inter.className} bg-[#ffffff]`}>
            <div className="flex gap-2 w-full mt-[0.5px]  ">
              <div className=" sm:block  ">
              <Suspense fallback={<div><MenuLoader></MenuLoader></div>}>
                <SideMenuBar></SideMenuBar>
                </Suspense>
              </div>
              <div className="flex-1 " id="mainTag" >
                <WebsocketProvider>
                  <Suspense fallback={<p>loading...</p>}>
                    {children}
                  </Suspense>
                </WebsocketProvider>
                <Toaster />
              </div>
            </div>
          </body>
        </ToastProvider>
      </AuthProvider>
    </html>
  );
}
