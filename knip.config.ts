import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'src/lib/api/**', // Ignore all auto-generated API client files
    'openapi-ts.config.ts', // Ignore OpenAPI config file
  ],
  ignoreDependencies: [
    'tailwindcss', // Ignore tailwindcss because knip doesn't recognize v4 yet
    'dotenv', // Used in openapi-ts.config.ts
    'typescript-eslint', // Used in eslint.config.mjs
  ],
};

export default config;
