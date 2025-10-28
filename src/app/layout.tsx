"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter, Noto_Serif_JP } from "next/font/google";

import {
  LayoutDashboard,
  SpellCheck,
  BookMarked,
  Milestone,
  BookOpen,
  Headphones,
} from "lucide-react";
import { AppSidebar } from "../components/AppSidebar";

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

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vocabulary", label: "Vocabulario", icon: SpellCheck },
  { href: "/kanji", label: "Kanji", icon: BookMarked },
  { href: "/grammar", label: "Gramática", icon: Milestone },
  { href: "/reading", label: "Lectura", icon: BookOpen },
  { href: "/listening", label: "Auditiva", icon: Headphones },
  { href: "/review", label: "Repaso (SRS)", icon: Milestone },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  // Memoiza el QueryClient para evitar recrearlo en renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ja" className={`${inter.variable} ${notoSerifJP.variable}`}>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen">
            <AppSidebar navItems={navItems} />
            <main className="flex-1 lg:ml-64 transition-all duration-300">
              <div className="p-6 md:p-10">{children}</div>
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
