const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const ADMIN_EMAIL = env['RESEND_ADMIN_EMAIL'] || 'admin@opencredit.money';
const ADMIN_PASSWORD = 'OpenCreditAdmin@2026'; // Please change this after first login

async function createAdmin() {
  console.log(`Checking for admin user: ${ADMIN_EMAIL}...`);

  // 1. Try to find the user
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('Error listing users:', listError.message);
    return;
  }

  let user = users.find(u => u.email === ADMIN_EMAIL);

  if (!user) {
    console.log('User not found. Creating new admin user...');
    const { data: { user: newUser }, error: createError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'OpenCredit Admin' }
    });

    if (createError) {
      console.error('Error creating user:', createError.message);
      return;
    }
    user = newUser;
    console.log('User created successfully.');
  } else {
    console.log('User already exists. Updating role...');
  }

  // 2. Update profiles table to set admin role
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (profileError) {
    console.error('Error updating profile role:', profileError.message);
    
    // Fallback: If profile doesn't exist (trigger failed?), try inserting
    console.log('Attempting to insert profile if missing...');
    await supabase.from('profiles').upsert({
      id: user.id,
      email: ADMIN_EMAIL,
      full_name: 'OpenCredit Admin',
      role: 'admin'
    });
  } else {
    console.log('Profile updated to admin role.');
  }

  console.log('\n-----------------------------------');
  console.log('ADMIN ACCOUNT READY');
  console.log(`Email: ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log('-----------------------------------\n');
}

createAdmin();
