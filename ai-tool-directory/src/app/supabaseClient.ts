import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufhemmzwllrlygjtkgrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaGVtbXp3bGxybHlnanRrZ3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDE0NDAsImV4cCI6MjA2NzM3NzQ0MH0.QSF0KsLbzG0HLT-Ps-wNXonWoRuY59kNq2Huuk1BhNg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true }
}); 