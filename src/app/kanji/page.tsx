import { createClient } from '@/lib/supabase/server';

export default async function KanjiPage() {
  
  // Creamos una instancia del cliente y pedimos los datos
  const supabase = await createClient();

  // Hacemos la consulta a tu tabla 'kanji'
  // Pedimos todos los kanjis (select *) y los ordenamos por id
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
          <div key={kanji.id} className="card p-4 text-center">
            <p className="font-kanji text-5xl">{kanji.character}</p>
            <p className="meta">{kanji.meaning_es.join(', ')}</p>
          </div>
        ))}
      </div>

    </div>
  );
}