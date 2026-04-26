import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Repository utility scripts not shipped with the Next.js app:
    "create-map.js",
    "fix-map-colors.js",
    "generate-map.js",
    "generate-map-fixed.js",
    "generate-map-v2.js",
  ]),
]);

export default eslintConfig;
