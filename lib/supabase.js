import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using Service Role Key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // must match exactly

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error("Supabase URL or Service Key not set in env");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
