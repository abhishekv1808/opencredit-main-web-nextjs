/**
 * Creates the loan-documents storage bucket in Supabase.
 * Run with: node scripts/create-storage-bucket.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const i = line.indexOf('=');
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function run() {
  console.log('\n🪣  Setting up Supabase storage buckets...\n');

  // Create loan-documents bucket (private)
  const { data, error } = await supabase.storage.createBucket('loan-documents', {
    public: false,
    fileSizeLimit: 5242880, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('✅  loan-documents bucket already exists.');
    } else {
      console.error('❌  Failed to create bucket:', error.message);
      return;
    }
  } else {
    console.log('✅  loan-documents bucket created successfully.');
  }

  // Verify
  const { data: buckets } = await supabase.storage.listBuckets();
  console.log('\n📦  All buckets:', buckets?.map(b => `${b.name} (${b.public ? 'public' : 'private'})`).join(', '));
  console.log('\n✅  Done. You can now upload documents.\n');
}

run().catch(console.error);
