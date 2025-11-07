import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function KanjiDetailPage({ params }: { params: { character: string } }) {

  const kanjiCharacter = decodeURIComponent(params.character);
  const supabase = await createClient();

  // CONSULTA #1: Buscar el Kanji principal
  const { data: kanji, error: kanjiError } = await supabase
    .from('kanji')
    .select('*')
    .eq('character', kanjiCharacter)
    .single();

  if (kanjiError || !kanji) {
    return <p className="text-red-500">Kanji no encontrado: {kanjiCharacter}</p>;
  }

  // CONSULTA #2: Buscar el Vocabulario relacionado
  const { data: vocabList, error: vocabError } = await supabase
    .from('kanji_in_vocabulary')
    .select('vocabulary(*)') // El JOIN
    .eq('kanji_id', kanji.id);

  if (vocabError) {
    return <p className="text-red-500">Error al cargar el vocabulario: {vocabError.message}</p>;
  }

  return (
    <div>
      <Link href="/kanji" className="meta mb-6 inline-block">&larr; Volver a la lista de Kanji</Link>

      {/* SECCIÓN DEL KANJI PRINCIPAL */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <p className="text-xl">N{kanji.jlpt_level}</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE VOCABULARIO RELACIONADO */}
      <h2 className="text-2xl font-bold mb-4">Vocabulario que usa este Kanji</h2>
      <div className="card">
        {vocabList && vocabList.length > 0 ? (
          <ul className="divide-y divide-(--border)">
            {vocabList.map((item) => {
              // 'item.vocabulary' puede ser un objeto o un array
              const voc = Array.isArray(item.vocabulary) ? item.vocabulary[0] : item.vocabulary;
              return (
                <li key={voc?.id} className="py-4">
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