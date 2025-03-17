
import type { Metadata } from "next";
import { Inter, } from "next/font/google";
import "./../globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import jwtHelpers from "@/helpers/jwt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Content Management System",
  description: "-",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storedCookies = cookies()
  const rawToken = storedCookies.get('token')
  let userRole:any = jwtHelpers.parseToken(rawToken?.value).then(data=>{
    return data.payload?.role || 'admin'
  })
  var token = ""
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen max-h-screen overflow-hidden`}>
        <div className="flex dashboard-content">
          <div className="grow max-h-screen overflow-scroll">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
