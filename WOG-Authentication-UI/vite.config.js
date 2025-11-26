import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      // Включён новый компилятор React 
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  // Красивые алиасы для пути вида "@/components/WogForm"
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@styles": "/src/styles",
    },
  },

  // Улучшение Dev сервера
  server: {
    port: 5173,
    open: true, // автоматически открывает браузер
  },

  //  Оптимальная сборка для маленьких UI-проектов
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
  },
});

