"use client";

import KanjiCard from "@/components/kanjiCard";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <KanjiCard
        kanji="水"
        meanings={["water"]}
        kun={["みず", "みず-"]}
        on={["スイ"]}
        jlpt={5}
      />
    </main>
  );
}
