-- ================================================================
-- Home Loan Migration Script
-- Run this in Supabase SQL Editor before deploying the home loan feature
-- ================================================================

-- 1. Extend product_type constraint to include home_loan
ALTER TABLE public.loan_applications
  DROP CONSTRAINT IF EXISTS loan_applications_product_type_check;

ALTER TABLE public.loan_applications
  ADD CONSTRAINT loan_applications_product_type_check
  CHECK (product_type IN ('personal_loan', 'credit_correction', 'home_loan'));

-- 2. Add home-loan-specific columns
ALTER TABLE public.loan_applications
  ADD COLUMN IF NOT EXISTS property_type        TEXT,
  ADD COLUMN IF NOT EXISTS property_value       NUMERIC(14,2),
  ADD COLUMN IF NOT EXISTS down_payment         NUMERIC(14,2),
  ADD COLUMN IF NOT EXISTS property_address     TEXT,
  ADD COLUMN IF NOT EXISTS property_city        TEXT,
  ADD COLUMN IF NOT EXISTS property_state       TEXT,
  ADD COLUMN IF NOT EXISTS property_pincode     TEXT,
  ADD COLUMN IF NOT EXISTS builder_name         TEXT,
  ADD COLUMN IF NOT EXISTS co_applicant_name    TEXT,
  ADD COLUMN IF NOT EXISTS co_applicant_relation TEXT,
  ADD COLUMN IF NOT EXISTS co_applicant_income  NUMERIC(12,2);

-- 3. Extend document_type constraint for property documents
ALTER TABLE public.application_documents
  DROP CONSTRAINT IF EXISTS application_documents_document_type_check;

ALTER TABLE public.application_documents
  ADD CONSTRAINT application_documents_document_type_check
  CHECK (document_type IN (
    'pan_card','aadhaar','salary_slip_1','salary_slip_2','salary_slip_3',
    'bank_statement','itr','photo','cibil_report','other',
    'property_doc','noc','property_tax','title_deed'
  ));
