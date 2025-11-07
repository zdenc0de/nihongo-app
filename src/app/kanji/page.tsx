import { createClient } from '@/lib/supabase/server';
import Link from 'next/link'; // <!-- 1. IMPORTAMOS EL ENLACE

export default async function KanjiPage() {
  
  const supabase = await createClient();

  const { data: kanjis, error } = await supabase
    .from('kanji') 
    .select('*')     
    .order('id', { ascending: true });

  if (error) {
    return <p className="text-red-500">Error al cargar los kanjis: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Lista de Kanji
      </h1>
      <p className="mb-4">Número total de kanjis: {kanjis?.length}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {kanjis?.map((kanji) => (
          
          // <!-- 2. ENVOLVEMOS TODO EN EL COMPONENTE <Link> -->
          <Link 
            href={`/kanji/${kanji.character}`} // La URL dinámica
            key={kanji.id} 
            // 3. Pasamos las clases de 'card' al Link
            className="card p-4 text-center transition-transform hover:scale-105 hover:shadow-lg"
          >
            <p className="font-kanji text-5xl">{kanji.character}</p>
            {/* Usamos 'slice' por si un kanji tiene muchos significados, mostramos solo los 2 primeros */}
            <p className="meta">{kanji.meaning_es.slice(0, 2).join(', ')}</p>
          </Link>

        ))}
      </div>

    </div>
  );
}