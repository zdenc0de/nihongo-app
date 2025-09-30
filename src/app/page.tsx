"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchKanji } from "@/lib/kanjiApi";
import KanjiCard from "@/components/kanjiCard";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["kanji", "水"],
    queryFn: () => fetchKanji("水"),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !data) return <p>Error al cargar</p>;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <KanjiCard {...data} />
    </main>
  );
}

