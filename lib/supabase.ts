import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gremqqrybynkttytxthz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZW1xcXJ5Ynlua3R0eXR4dGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTQ3MDEsImV4cCI6MjA0OTA3MDcwMX0.VSIrMcc_tUhDXGEd4J0S3qjqnakq31OB-zT-7PfCXIg';

export const supabase = createClient(supabaseUrl, supabaseKey);