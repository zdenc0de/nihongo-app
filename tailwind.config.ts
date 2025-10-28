import type { Config } from 'tailwindcss';

const config: Config = {
  // Esta es la parte clave.
  // Le dice a Tailwind que escanee todos los archivos .tsx y .jsx
  // dentro de 'app' y 'components' en tu carpeta 'src'.
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Habilita el modo oscuro basado en la clase 'dark' (que podemos
  // agregar al <html> en nuestro layout.tsx si queremos control manual)
  // o 'media' (que respeta la configuración del OS del usuario).
  // 'media' es más simple para empezar.
  darkMode: 'media', 
  theme: {
    extend: {
      // Aquí podemos agregar nuestras fuentes personalizadas,
      // como la que queríamos para el kanji.
      fontFamily: {
        // Esto crea la clase 'font-sans'
        sans: ['Inter', 'sans-serif'],
        // Esto crea la clase 'font-jp' (en lugar de .jp-text)
        jp: ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;