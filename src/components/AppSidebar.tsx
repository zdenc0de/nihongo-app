'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Tipo para los ítems de navegación
type NavItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
};

// Props del componente AppSidebar
interface AppSidebarProps {
  navItems: NavItemProps[];
}

export function AppSidebar({ navItems }: AppSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <>
      <div className="flex justify-between items-center p-4 mb-4">
        <h1 className="text-2xl font-bold text-white">日本語  シ</h1>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-400 hover:text-white lg:hidden"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="px-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Sidebar (Overlay en móvil, Fijo en desktop) */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Contenido del Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-800 text-white shadow-lg
          transform transition-transform z-40 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Header para móvil (con botón de menú) */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-700 dark:text-gray-300"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-gray-700 dark:text-gray-300">
          ¡Hola, Zdenc0de!
        </div>
      </header>
    </>
  );
}
