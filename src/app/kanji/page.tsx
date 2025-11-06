// src/app/kanji/page.tsx

// 1. Importamos el NUEVO cliente de SERVIDOR que creamos
import { createClient } from '@/lib/supabase/server';
// Nota: '@/' es un alias que Next.js crea para apuntar a tu carpeta 'src/'

// 2. Convertimos la página en un "Server Component" asíncrono
// Esto significa que se ejecuta en el servidor, obtiene los datos
// y envía el HTML listo al navegador. ¡Es súper rápido!
export default async function KanjiPage() {
  
  // 3. Creamos una instancia del cliente y pedimos los datos
  const supabase = await createClient();
  
  // 4. Hacemos la consulta a tu tabla 'kanji'
  //    Pedimos todos los kanjis (select *) y los ordenamos por id
  const { data: kanjis, error } = await supabase
    .from('kanji') // El nombre de tu tabla
    .select('*')     // Pedimos todas las columnas
    .order('id', { ascending: true }); // Opcional: ordenarlos

  // 5. Manejamos si hay un error
  if (error) {
    return <p className="text-red-500">Error al cargar los kanjis: {error.message}</p>;
  }

  // 6. ¡Renderizamos los datos!
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Lista de Kanji (desde Supabase)
      </h1>

      {/* Usamos la etiqueta <pre> para mostrar los datos en "crudo".
        Esto es feo, pero es la mejor forma de VERIFICAR 
        que la conexión funciona y estás recibiendo tus datos.
      */}
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(kanjis, null, 2)}
      </pre>

      {/* Una vez que verifiques que los datos llegan, puedes
        borrar el <pre> y usar un .map() para mostrarlos bonito:
      */}
      {/*
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {kanjis?.map((kanji) => (
          <div key={kanji.id} className="card p-4 text-center">
            <p className="font-kanji text-5xl">{kanji.character}</p>
            <p className="meta">{kanji.meaning_es.join(', ')}</p>
          </div>
        ))}
      </div>
      */}

    </div>
  );
}