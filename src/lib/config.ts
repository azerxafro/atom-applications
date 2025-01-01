// Environment configuration with validation
export const config = {
  supabase: {
    url: import.meta.env.PUBLIC_SUPABASE_URL,
    key: import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  }
} as const;

export function validateConfig() {
  if (!config.supabase.url) {
    throw new Error('CRITICAL: PUBLIC_SUPABASE_URL is not set');
  }
  if (!config.supabase.key) {
    throw new Error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is not set');
  }
}