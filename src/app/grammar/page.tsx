import { createClient } from '@/lib/supabase/server';

export default async function GrammarPage() {
  
  // Creamos una instancia del cliente y pedimos los datos
  const supabase = await createClient();

  // Hacemos la consulta a tu tabla 'kanji'
  // Pedimos todos los kanjis (select *) y los ordenamos por id
  const { data: grammar, error } = await supabase
    .from('grammar') 
    .select('*')     
    .order('id', { ascending: true });
  if (error) {
    return <p className="text-red-500">Error al cargar la gramática: {error.message}</p>;
  }

return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Lista de Gramática
      </h1>
      <p className="mb-4">Número total de puntos gramaticales: {grammar?.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {grammar?.map((item) => (
          <div key={item.id} className="card p-4 flex flex-col justify-between">
            <p className="font-kanji text-3xl font-bold mb-2">{item.structure}</p>
            <p className="meta">{item.meaning_es}</p>
          </div>
        ))}
      </div>

    </div>
  );
}