/**
 * Supabase Client - Frontend client for Supabase integration
 * 
 * This module provides a configured Supabase client for frontend use,
 * including authentication and real-time features.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

/**
 * Create and export the Supabase client
 * Returns null if credentials are not configured
 */
function createSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not configured. Authentication features will use mock mode.');
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    });
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
}

// Create the client instance
export const supabase = createSupabaseClient();

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseKey && supabase);
}

/**
 * Get the current session
 */
export async function getSession() {
  if (!supabase) return null;
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

/**
 * Get the current user
 */
export async function getUser() {
  if (!supabase) return null;
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}

/**
 * Listen for authentication state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!supabase) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  
  return supabase.auth.onAuthStateChange(callback);
}

export default supabase;
