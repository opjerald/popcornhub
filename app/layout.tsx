import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";

import "./globals.css";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Popcorn Hub",
  description: "Download free movie torrent, watch it while eating popcorn",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
