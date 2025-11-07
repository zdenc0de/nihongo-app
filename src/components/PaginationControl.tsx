// src/components/PaginationControl.tsx

import Link from 'next/link';

type PaginationProps = {
  baseURL: string; // La URL base (ej. '/grammar' o '/kanji')
  currentPage: number;
  totalPages: number;
};

export default function PaginationControl({ 
  baseURL, 
  currentPage, 
  totalPages 
}: PaginationProps) {
  
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-6 my-8">
      {/* Botón de Anterior */}
      <Link
        href={`${baseURL}?page=${currentPage - 1}`}
        // Deshabilitamos el enlace si no hay página anterior
        aria-disabled={!hasPrev}
        className={`
          btn-pill 
          ${!hasPrev ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        &larr; Anterior
      </Link>

      {/* Indicador de Página */}
      <span className="meta">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón de Siguiente */}
      <Link
        href={`${baseURL}?page=${currentPage + 1}`}
        // Deshabilitamos el enlace si no hay página siguiente
        aria-disabled={!hasNext}
        className={`
          btn-pill 
          ${!hasNext ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        Siguiente &rarr;
      </Link>
    </div>
  );
}