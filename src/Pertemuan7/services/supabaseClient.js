import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const fallbackClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({
      data: { user: null },
      error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
    }),
    signInWithPassword: async () => ({
      data: { user: null, session: null },
      error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
    }),
    signUp: async () => ({
      data: { user: null, session: null },
      error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
    }),
    signOut: async () => ({ error: null }),
    setSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
  from: () => {
    const response = {
      select: () => response,
      insert: () => response,
      upsert: () => response,
      update: () => response,
      delete: () => response,
      eq: () => response,
      order: () => response,
      single: async () => ({
        data: null,
        error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
      }),
      maybeSingle: async () => ({
        data: null,
        error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
      }),
      then: (resolve) =>
        resolve({
          data: [],
          error: { message: 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.' },
        }),
    };
    return response;
  },
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : fallbackClient;
