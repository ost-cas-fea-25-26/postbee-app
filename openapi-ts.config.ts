import { defineConfig } from '@hey-api/openapi-ts';
import 'dotenv/config';

const baseUrl = process.env.API_URL_MUMBLE;

if (!baseUrl) {
  console.error('❌ API_URL_MUMBLE is not defined in your env files');
  process.exit(1);
}

export default defineConfig({
  input: `${baseUrl}/swagger/v1/swagger.json`,
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/lib/api/client',
  },
  plugins: [
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: '@/lib/api',
    },
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
});
