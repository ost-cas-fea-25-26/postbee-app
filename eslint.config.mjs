import { config as smartiveConfig } from '@smartive/eslint-config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...smartiveConfig('nextjs'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser,
    },
  },
];

export default config;
