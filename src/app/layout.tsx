"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import { Provider } from "react-redux";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
