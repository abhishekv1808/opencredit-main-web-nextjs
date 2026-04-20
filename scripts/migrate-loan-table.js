/**
 * Adds all missing columns to the loan_applications table.
 * Run with: node scripts/migrate-loan-table.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually (same as fix-admin.js)
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const eqIdx = line.indexOf('=');
  if (eqIdx > 0) {
    const key = line.slice(0, eqIdx).trim();
    const value = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) env[key] = value;
  }
});

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
);

// All columns that must exist on loan_applications
const requiredColumns = [
  // Applicant info
  { name: 'full_name',              sql: 'TEXT' },
  { name: 'dob',                    sql: 'DATE' },
  { name: 'gender',                 sql: 'TEXT' },
  { name: 'pan_number',             sql: 'TEXT' },
  { name: 'phone',                  sql: 'TEXT' },
  // Address
  { name: 'address_line1',          sql: 'TEXT' },
  { name: 'address_line2',          sql: 'TEXT' },
  { name: 'pincode',                sql: 'TEXT' },
  // Employment
  { name: 'employment_type',        sql: "TEXT CHECK (employment_type IN ('salaried','self_employed','business'))" },
  { name: 'company_name',           sql: 'TEXT' },
  { name: 'designation',            sql: 'TEXT' },
  { name: 'monthly_income',         sql: 'NUMERIC(12,2)' },
  { name: 'work_experience_years',  sql: 'INTEGER' },
  { name: 'existing_emi',           sql: 'NUMERIC(12,2) DEFAULT 0' },
  // Loan details
  { name: 'loan_amount_requested',  sql: 'NUMERIC(12,2)' },
  { name: 'loan_tenure_months',     sql: 'INTEGER' },
  { name: 'purpose',                sql: 'TEXT' },
  { name: 'cibil_score',            sql: 'INTEGER' },
  { name: 'preferred_bank',         sql: 'TEXT' },
  // Admin fields
  { name: 'admin_notes',            sql: 'TEXT' },
  { name: 'assigned_to',            sql: 'UUID' },
  { name: 'approved_amount',        sql: 'NUMERIC(12,2)' },
  { name: 'approved_rate',          sql: 'NUMERIC(5,2)' },
  { name: 'rejection_reason',       sql: 'TEXT' },
  { name: 'submitted_at',           sql: 'TIMESTAMPTZ' },
];

async function migrate() {
  console.log('\n🔧  OpenCredit — loan_applications migration\n');

  // 1. Verify the table exists
  const { error: tableCheck } = await supabase
    .from('loan_applications')
    .select('id')
    .limit(1);

  if (tableCheck) {
    console.error('❌  Cannot reach loan_applications:', tableCheck.message);
    console.log('\n📋  Run this SQL in Supabase Studio → SQL Editor first:\n');
    console.log(createTableSQL());
    return;
  }

  console.log('✅  Table loan_applications exists. Checking columns…\n');

  // 2. Fetch one row to see which columns exist
  const { data: sample } = await supabase
    .from('loan_applications')
    .select('*')
    .limit(1);

  const existingCols = sample && sample.length > 0
    ? Object.keys(sample[0])
    : [];

  const missing = requiredColumns.filter(c => !existingCols.includes(c.name));

  if (missing.length === 0 && existingCols.length > 0) {
    console.log('✅  All columns already present. Nothing to do.\n');
    return;
  }

  // 3. Print the ALTER TABLE statements for Supabase Studio
  console.log('⚠️   Missing columns detected. Run this SQL in Supabase Studio → SQL Editor:\n');
  console.log('-- ─────────────────────────────────────────────────────────────');
  console.log('-- OpenCredit: Add missing columns to loan_applications');
  console.log('-- Paste this into Supabase Studio → SQL Editor → Run');
  console.log('-- ─────────────────────────────────────────────────────────────\n');

  const alterStatements = requiredColumns
    .map(col => `ALTER TABLE public.loan_applications\n  ADD COLUMN IF NOT EXISTS ${col.name} ${col.sql};`)
    .join('\n\n');

  console.log(alterStatements);
  console.log('\n-- ─────────────────────────────────────────────────────────────');
  console.log('-- After running the above, reload your Supabase schema cache:');
  console.log('-- Settings → API → Reload Schema (or restart your app)\n');
}

function createTableSQL() {
  return `
CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  application_number TEXT UNIQUE NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('personal_loan', 'credit_correction')),
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft','submitted','under_review','approved','rejected','disbursed')),

  full_name TEXT,
  dob DATE,
  gender TEXT,
  pan_number TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  pincode TEXT,

  employment_type TEXT CHECK (employment_type IN ('salaried','self_employed','business')),
  company_name TEXT,
  designation TEXT,
  monthly_income NUMERIC(12,2),
  work_experience_years INTEGER,
  existing_emi NUMERIC(12,2) DEFAULT 0,

  loan_amount_requested NUMERIC(12,2),
  loan_tenure_months INTEGER,
  purpose TEXT,
  cibil_score INTEGER,
  preferred_bank TEXT,

  admin_notes TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  approved_amount NUMERIC(12,2),
  approved_rate NUMERIC(5,2),
  rejection_reason TEXT,

  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`;
}

migrate().catch(console.error);
