declare namespace NodeJS {
  interface ProcessEnv {
    // AUTH
    NEXT_PUBLIC_AUTH_PROVIDER_ID: string;
    NEXT_PUBLIC_API_URL_MUMBLE: string;
    AUTH_CLIENT_ID: string;
    AUTH_CLIENT_SECRET: string;
    AUTH_DISCOVERY_URL: string;
    AUTH_SCOPES: string;
    // APIs
    API_URL_MUMBLE: string;
  }
}
