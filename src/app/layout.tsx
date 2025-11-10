import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Noto_Serif_JP } from "next/font/google";
import { AppSidebar } from "@/components/AppSidebar"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanji",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSerifJP.variable} dark`}> 
      <body>
        <div className="flex min-h-screen">
          <AppSidebar /> {/* ⭐ Sin props */}
          <main className="flex-1 lg:ml-64 transition-all duration-300">
            <div className="p-6 md:p-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}