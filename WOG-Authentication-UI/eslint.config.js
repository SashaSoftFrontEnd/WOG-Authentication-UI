import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  // Игнорируем сборку
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],

    // базовые рекомендации
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@components", "./src/components"],
            ["@styles", "./src/styles"],
          ],
          extensions: [".js", ".jsx"],
        },
      },
    },

    rules: {
      // Разрешаем "useState" даже если не используется в файле
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],

      // Лучшие практики хуков
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Разрешаем использование JSX в любом файле
      "react-refresh/only-export-components": "off",

      // Чуть мягче для разработки
      "no-console": "off",
      "no-debugger": "warn",
    },
  },
]);
