declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_HOST: string;
    // AUTH
    NEXT_PUBLIC_AUTH_PROVIDER_ID: string;
    AUTH_CLIENT_ID: string;
    AUTH_CLIENT_SECRET: string;
    AUTH_DISCOVERY_URL: string;
    AUTH_SCOPES: string;
    // DATABASE
    DATABASE_URL: string;
    // APIs
    API_URL_MUMBLE: string;
  }
}
