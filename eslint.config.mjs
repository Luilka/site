import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "__nexy__/**",
      "node_modules/**",
      ".venv/**",
      "dist/**",
      "docs/**",
      "reports/**",
      "research_notes/**",
      "tmp/**",
      "src/types/nexy-client.d.ts",
      "src/shared/types/nexy-client.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "max-lines-per-function": ["error", { max: 10, skipBlankLines: true, skipComments: true }],
      "no-inline-comments": "error",
    },
  },
);
