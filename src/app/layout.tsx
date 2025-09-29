import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400","600","700","900"],
  variable: "--font-kanji",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nihongo Study",
  description: "Kanji-focused Japanese study app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSerifJP.variable}>
      <body>{children}</body>
    </html>
  );
}
