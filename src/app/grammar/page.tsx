// src/app/grammar/page.tsx

export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import PaginationControl from '@/components/PaginationControl';

const ITEMS_PER_PAGE = 12; 

export default async function GrammarPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // <-- Cambio en el tipo
}) {

  const supabase = await createClient();
  
  // Agregar await aquí
  const params = await searchParams;
  const currentPage = parseInt(params.page ?? '1', 10);

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data: grammar, error } = await supabase
    .from('grammar') 
    .select('*')     
    .order('id', { ascending: true })
    .range(from, to); 

  if (error) {
    return <p className="text-red-500">Error al cargar la gramática: {error.message}</p>;
  }

  const { count, error: countError } = await supabase
    .from('grammar')
    .select('*', { 
        count: 'estimated',
        head: true 
    });

  if (countError || count === null) {
    return <p className="text-red-500">Error al contar la gramática.</p>;
  }

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Lista de Gramática
      </h1>
      
      <p className="mb-4">
        Mostrando {grammar?.length} de ~{count} puntos gramaticales
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {grammar?.map((item) => (
          <Link 
            href={`/grammar/${item.id}`} 
            key={item.id}
            className="card p-4 flex flex-col justify-between transition-transform hover:scale-105"
          >
            <p className="font-kanji text-3xl font-bold mb-2">{item.structure}</p>
            <p className="meta">{item.meaning_es}</p>
          </Link>
        ))}
      </div>

      <PaginationControl
        baseURL="/grammar"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}