import smartiveConfig from '@smartive/prettier-config' with { type: 'json' };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { $schema, ...config } = smartiveConfig;

/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  ...config,
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^components/(.*)$', '^utils/(.*)$', '^styles/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default prettierConfig;
