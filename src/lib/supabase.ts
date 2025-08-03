import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  throw new Error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our consultation data
export interface ConsultationData {
  name: string;
  email: string;
  company: string;
  business_size: string;
  service: string;
  processes: string;
}

export interface ConsultationResponse {
  id: string;
  name: string;
  email: string;
  company: string;
  business_size: string;
  service: string;
  processes: string;
  status: string;
  created_at: string;
}