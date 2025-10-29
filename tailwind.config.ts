// tailwind.config.ts (en la raíz de tu proyecto)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Por si acaso tienes algo ahí
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Habilitamos el modo oscuro basado en la clase 'dark' en el <html>
  theme: {
    extend: {
      // Definimos tu nueva paleta de colores
      colors: {
        primary: '#81021F',    // Rojo Burdeos
        secondary: '#134857',  // Azul Teal Oscuro
        tertiary: '#CFB787',   // Dorado Beige (como tu "oro de moda")
        accent: '#FACC15',     // Un amarillo o naranja vibrante para acentos o estados de éxito (puedes ajustar)
        // Colores de texto y fondo para UI general si no queremos usar los de la paleta principal
        // Puedes agregar más tonos si los necesitas, ej. 'gray-100', 'gray-900'
        backgroundLight: '#f7fafc', // Gris muy claro
        backgroundDark: '#111827', // Gris-azul oscuro
        textLight: '#111827', // Gris-azul oscuro
        textDark: '#f7fafc',  // Gris muy claro
      },
      // Configuramos las fuentes para usarlas con clases como `font-sans`, `font-kanji`
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'], // Para la UI general
        kanji: ['var(--font-kanji)', '"Noto Serif JP"', 'serif'], // Para el texto japonés prominente
        // Si tienes "Tallica", la puedes añadir aquí:
        // tallica: ['Tallica', 'serif'], 
      },
      // Puedes ajustar tamaños de fuente para el Kanji grande si no quieres usar clamp
      fontSize: {
        'kanji-xl': 'clamp(5rem, 16vw + 1rem, 14rem)', // Un tamaño fluido para el kanji grande
      }
    },
  },
  plugins: [],
};
export default config;