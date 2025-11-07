import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

// 1. Recibimos 'params' de la URL.
// Next.js nos dará { params: { character: '水' } } por ejemplo.
export default async function KanjiDetailPage({ params }: { params: { character: string } }) {

  // 2. Decodificamos el carácter de la URL (ej. '水' puede venir como '%E6%B0%B4')
  const kanjiCharacter = decodeURIComponent(params.character);
  const supabase = await createClient();

  // 3. CONSULTA #1: Buscar el Kanji principal
  // Usamos .eq() para encontrar la fila donde 'character' sea igual al de la URL
  // Usamos .single() porque sabemos que solo hay UN kanji '水'
  const { data: kanji, error: kanjiError } = await supabase
    .from('kanji')
    .select('*')
    .eq('character', kanjiCharacter)
    .single();

  if (kanjiError || !kanji) {
    return <p className="text-red-500">Kanji no encontrado: {kanjiCharacter}</p>;
  }

  // 4. CONSULTA #2: Buscar el Vocabulario relacionado
  // Esta es la "magia" de tu base de datos relacional.
  // - Vamos a 'kanji_in_vocabulary'
  // - Filtramos donde 'kanji_id' sea el ID del kanji que encontramos (kanji.id)
  // - Usamos 'vocabulary(*)' para que Supabase haga el "JOIN" y nos traiga
  //   la información completa de cada palabra de vocabulario.
  const { data: vocabList, error: vocabError } = await supabase
    .from('kanji_in_vocabulary')
    .select('vocabulary(*)') // <-- La magia del JOIN
    .eq('kanji_id', kanji.id);

  if (vocabError) {
    return <p className="text-red-500">Error al cargar el vocabulario: {vocabError.message}</p>;
  }

  return (
    <div>
      {/* Botón simple para volver a la lista */}
      <Link href="/kanji" className="meta mb-6 inline-block">&larr; Volver a la lista de Kanji</Link>

      {/* SECCIÓN DEL KANJI PRINCIPAL */}
      {/* Aquí puedes usar tus componentes KanjiCard.tsx y KanjiDetailItem.tsx */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-9xl">
          <div className="flex flex-col items-center justify-center">
            <p className="font-kanji kanji-display">{kanji.character}</p>
          </div>
          <div>
            <h2 className="attr-label mb-2">Significados</h2>
            <p className="text-2xl mb-4">{kanji.meaning_es.join(', ')}</p>

            <h2 className="attr-label mb-2">Lecturas Kun&apos;yomi</h2>
            <p className="font-kanji text-xl mb-4">{kanji.kunyomi.join('、')}</p>
            
            <h2 className="attr-label mb-2">Lecturas On&apos;yomi</h2>
            <p className="font-kanji text-xl mb-4">{kanji.onyomi.join('、')}</p>

            <h2 className="attr-label mb-2">Trazos</h2>
            <p className="text-xl">{kanji.stroke_count}</p>

            <h2 className="attr-label mb-2">JLPT</h2>
            <p className="text-xl">{kanji.jlpt_level}</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE VOCABULARIO RELACIONADO */}
      <h2 className="text-2xl font-bold mb-4">Vocabulario que usa este Kanji</h2>
      <div className="card">
        {vocabList && vocabList.length > 0 ? (
          <ul className="divide-y divide-(--border)">
            {vocabList.map((item, i) => {
              const voc = Array.isArray(item.vocabulary) ? item.vocabulary[0] : item.vocabulary;
              return (
                <li key={voc?.id ?? `vocab-${i}`} className="py-4">
                  <p className="font-kanji text-3xl">{voc?.word ?? ''}</p>
                  <p className="meta">{voc?.reading ?? ''}</p>
                  <p className="meta mt-1">{Array.isArray(voc?.meaning_es) ? voc.meaning_es.join(', ') : ''}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="meta">No hay palabras de vocabulario vinculadas a este kanji todavía.</p>
        )}
      </div>
    </div>
  );
}