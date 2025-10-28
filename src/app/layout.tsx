"use client"; 

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css'; 
import {
  LayoutDashboard,
  SpellCheck,
  BookMarked,
  Milestone,
  BookOpen,
  Headphones,
} from 'lucide-react';
import { AppSidebar } from '../components/AppSidebar';

// Creamos una instancia de QueryClient
const queryClient = new QueryClient();

// Define los ítems de navegación que usaremos en el Sidebar
const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vocabulary', label: 'Vocabulario', icon: SpellCheck },
  { href: '/kanji', label: 'Kanji', icon: BookMarked },
  { href: '/grammar', label: 'Gramática', icon: Milestone },
  { href: '/reading', label: 'Lectura', icon: BookOpen },
  { href: '/listening', label: 'Auditiva', icon: Headphones },
  { href: '/review', label: 'Repaso (SRS)', icon: Milestone }, // Añadido
];

export default function RootLayout({
  children,
}: {
  children: ReactNode; // Usamos ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {/* Envolvemos *toda* la app en el QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen">
            {/* AppSidebar será un Componente Cliente ('use client') 
              porque maneja estado (abrir/cerrar).
              Pasamos los navItems como props.
            */}
            <AppSidebar navItems={navItems} />

            {/* Contenido Principal */}
            <main className="flex-1 lg:ml-64 transition-all duration-300">
              {/* El header (con el botón de menú móvil) 
                también será parte de AppSidebar
              */}
              <div className="p-6 md:p-10">
                {children} {/* Aquí se renderizarán nuestras páginas */}
              </div>
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}

