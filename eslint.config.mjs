import { config as smartiveConfig } from '@smartive/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
const config = [...smartiveConfig('nextjs')];

export default config;
