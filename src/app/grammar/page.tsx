import { createClient } from '@/lib/supabase/server'; // 1. Volviendo a intentar con el alias '@/'
import Link from 'next/link';

export default async function GrammarPage() {
  
  // 2. 'createClient()' retorna una Promise que debe ser resuelta con 'await'
  const supabase = await createClient(); 

  // 3. Ahora podemos usar .from() en el cliente resuelto
  const { data: grammar, error } = await supabase
    .from('grammar') 
    .select('*')     
    .order('id', { ascending: true });

  if (error) {
    return <p className="text-red-500">Error al cargar la gramática: {error.message}</p>;
  }

  // Si no hay gramática, la consulta funciona pero 'grammar' es un array vacío
  // El .map() simplemente no se ejecutará, lo cual está bien.

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Lista de Gramática
      </h1>
      <p className="mb-4">Número total de puntos gramaticales: {grammar?.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {grammar?.map((item) => (
          
          <Link 
            // 4. El 'href' ahora usa un 'item.id' válido
            href={`/grammar/${item.id}`} 
            key={item.id}
            className="card p-4 flex flex-col justify-between transition-transform hover:scale-105"
          >
            <p className="font-kanji text-3xl font-bold mb-2">{item.structure}</p>
            <p className="meta">{item.meaning_es}</p>
          </Link>

        ))}
      </div>
    </div>
  );
}