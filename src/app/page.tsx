import React from 'react';

export default function DashboardPage() {
  return (
    // Usamos 'grid' y 'gap-6' de Tailwind
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Card Principal de Bienvenida */}
      <div className="card md:col-span-2"> {/* Usamos tu clase .card */}
        <h1 className="text-3xl font-bold">
          学習ダッシュボード
        </h1>
        <p className="meta mt-2"> {/* Usamos tu clase .meta */}
          ¡Bienvenido a tu Dashboard de Estudio!
        </p>
        <div className="hr-accent mt-4" /> {/* Usamos tu clase .hr-accent */}
      </div>

      {/* Card de Meta */}
      <div className="card"> {/* Usamos tu clase .card */}
        <h2 className="text-xl font-bold">Meta N4</h2>
        <p className="meta mt-2">
          Tu examen es en Diciembre. ¡Sigue así!
        </p>
        {/* Aquí usas la clase font-kanji que definiste en el @theme inline */}
        <p className="font-kanji text-5xl text-right mt-4 opacity-70">
          頑張って！
        </p>
      </div>

      {/* Card de Repaso (Próximamente) */}
      <div className="card"> {/* Usamos tu clase .card */}
        <h2 className="text-xl font-bold">Repaso (SRS)</h2>
        <p className="meta mt-2">
          Repasos pendientes para hoy:
        </p>
        <p className="text-6xl font-bold text-right mt-4 text-[var(--accent-secondary)]">
          12
        </p>
      </div>

    </div>
  );
}