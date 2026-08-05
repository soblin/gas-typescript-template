import pluginJs from "@eslint/js";
import googleappsscript from "eslint-plugin-googleappsscript";
import eslintPluginImport from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts"],
  },

  {
    ignores: ["dist/*", "webpack.config.js", "jest.config.js"],
  },

  {
    plugins: {
      googleappsscript: googleappsscript,
      eslintPluginImport,
    },
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "eslintPluginImport/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "~/*",
              group: "external",
              position: "before",
            },
            {
              pattern: "~/*",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "eslintPluginImport/newline-after-import": ["error", { count: 2 }],
    },
  },
];
