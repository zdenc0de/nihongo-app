import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

// ⭐ Caché de 60 segundos
export const revalidate = 60;

export default async function KanjiDetailPage({ 
  params 
}: { 
  params: Promise<{ character: string }>
}) {

  const { character } = await params;
  const kanjiCharacter = decodeURIComponent(character);
  
  const supabase = await createClient();

  // ⭐ OPTIMIZACIÓN: Consultas en paralelo con Promise.all
  const [kanjiResult] = await Promise.all([
    // CONSULTA #1: Buscar el Kanji principal
    supabase
      .from('kanji')
      .select('*')
      .eq('character', kanjiCharacter)
      .single()
  ]);

  if (kanjiResult.error || !kanjiResult.data) {
    return <p className="text-red-500">Kanji no encontrado: {kanjiCharacter}</p>;
  }

  const kanji = kanjiResult.data;

  // ⭐ Ahora que tenemos el kanji.id, hacemos la consulta de vocabulario
  const { data: vocabList, error: vocabError } = await supabase
    .from('kanji_in_vocabulary')
    .select('vocabulary(id, word, reading, meaning_es)') // ⭐ Solo campos necesarios
    .eq('kanji_id', kanji.id);

  if (vocabError) {
    return <p className="text-red-500">Error al cargar el vocabulario: {vocabError.message}</p>;
  }

  return (
    <div>
      <Link href="/kanji" className="meta mb-6 inline-block">&larr; Volver a la lista de Kanji</Link>

      {/* SECCIÓN DEL KANJI PRINCIPAL */}
      <div className="card mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="font-kanji text-9xl">{kanji.character}</p>
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
            <p className="text-xl">N{kanji.jlpt_level}</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE VOCABULARIO RELACIONADO */}
      <h2 className="text-2xl font-bold mb-4">Vocabulario que usa este Kanji</h2>
      <div className="card p-6">
        {vocabList && vocabList.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {vocabList.map((item) => {
              const voc = Array.isArray(item.vocabulary) ? item.vocabulary[0] : item.vocabulary;
              return (
                <li key={voc?.id} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-kanji text-3xl">{voc?.word}</p>
                  <p className="meta">{voc?.reading}</p>
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