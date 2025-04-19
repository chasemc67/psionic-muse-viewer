import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/types/supabase';

if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');

// Create a single supabase client for interacting with your database
export const db = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
