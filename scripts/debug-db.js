const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkDatabase() {
  console.log('--- Checking Supabase Database ---');
  
  // Check Profiles
  const { error: profileError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
  console.log('Profiles table:', profileError ? `Error: ${profileError.message}` : 'Exists');

  // Check Applications
  const { error: appError } = await supabase.from('loan_applications').select('count', { count: 'exact', head: true });
  console.log('Loan Applications table:', appError ? `Error: ${appError.message}` : 'Exists');

  // Check Documents
  const { error: docError } = await supabase.from('application_documents').select('count', { count: 'exact', head: true });
  console.log('Application Documents table:', docError ? `Error: ${docError.message}` : 'Exists');
}

checkDatabase();
