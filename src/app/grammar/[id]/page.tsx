import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function GrammarDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> // <-- Cambio en el tipo
}) {

  const supabase = await createClient();
  
  // Agregar await aquí
  const { id } = await params;
  const grammarId = parseInt(id, 10);

  if (isNaN(grammarId)) {
    return <p className="text-red-500">ID de gramática inválido.</p>;
  }

  // CONSULTA #1: Buscar el punto de gramática principal
  const { data: grammar, error: grammarError } = await supabase
    .from('grammar')
    .select('*')
    .eq('id', grammarId)
    .single();

  if (grammarError || !grammar) {
    return <p className="text-red-500">Punto de gramática no encontrado.</p>;
  }

  // CONSULTA #2: Buscar los ejemplos relacionados
  const { data: examples } = await supabase
    .from('grammar_examples')
    .select('*')
    .eq('grammar_id', grammarId);

  return (
    <div>
      <Link href="/grammar" className="meta mb-6 inline-block">&larr; Volver a la lista de Gramática</Link>

      {/* SECCIÓN DE GRAMÁTICA PRINCIPAL */}
      <div className="card mb-8 p-6">
        <h1 className="font-kanji text-5xl font-bold">{grammar.structure}</h1>
        <p className="text-2xl mt-2">{grammar.meaning_es}</p>
        
        <h2 className="attr-label mt-6 mb-2">Forma de Uso</h2>
        <p className="meta text-lg whitespace-pre-line">{grammar.usage_jp}</p>
        
        <h2 className="attr-label mt-6 mb-2">Nivel JLPT</h2>
        <p className="meta text-lg">N{grammar.jlpt_level}</p>
      </div>

      {/* SECCIÓN DE EJEMPLOS RELACIONADOS */}
      <h2 className="text-2xl font-bold mb-4">Oraciones de Ejemplo</h2>
      <div className="card">
        {examples && examples.length > 0 ? (
          <ul className="divide-y divide-(--border)">
            {examples.map((ex) => (
              <li key={ex.id} className="py-4">
                <p className="font-kanji text-2xl mb-2">{ex.sentence_jp}</p>
                <p className="meta">{ex.sentence_romaji}</p>
                <p className="meta italic">{ex.sentence_es}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="meta">No hay ejemplos para este punto gramatical todavía.</p>
        )}
      </div>
    </div>
  );
}