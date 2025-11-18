declare namespace NodeJS {
  interface ProcessEnv {
    // AUTH
    NEXT_PUBLIC_AUTH_PROVIDER_ID: string;
    AUTH_CLIENT_ID: string;
    AUTH_CLIENT_SECRET: string;
    AUTH_DISCOVERY_URL: string;
    AUTH_SCOPES: string;
  }
}
