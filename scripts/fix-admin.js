const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function fixAdmin(){
  const email = 'admin@opencredit.money';
  console.log(`Fixing admin: ${email}`);

  // 1. Get User ID
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('List users error:', listError.message);
    return;
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    console.error('Admin user not found in auth.users!');
    return;
  }

  console.log(`Found User ID: ${user.id}`);

  // 1.5 Update User Metadata to avoid RLS recursion
  await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { role: 'admin', full_name: 'OpenCredit Admin' }
  });
  console.log('User metadata updated with role: admin');

  // 2. Force Upsert Profile
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: email,
      full_name: 'OpenCredit Admin',
      role: 'admin',
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error upserting profile:', error.message);
    if (error.code === 'PGRST116' || error.message.includes('not found')) {
      console.error('The profiles table might be missing!');
    }
  } else {
    console.log('Profile fixed successfully:', JSON.stringify(data, null, 2));
  }
}

fixAdmin();
