export type KycStatus = "pending" | "verified" | "rejected";
export type UserRole = "user" | "admin";
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed";
export type EmploymentType = "salaried" | "self_employed" | "business";
export type ProductType = "personal_loan" | "credit_correction";
export type DocumentType =
  | "pan_card"
  | "aadhaar"
  | "salary_slip_1"
  | "salary_slip_2"
  | "salary_slip_3"
  | "bank_statement"
  | "itr"
  | "photo"
  | "cibil_report"
  | "other";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  pan_number: string | null;
  date_of_birth: string | null;
  city: string;
  state: string;
  kyc_status: KycStatus;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface LoanApplication {
  id: string;
  user_id: string;
  application_number: string;
  product_type: ProductType;
  status: ApplicationStatus;
  loan_amount_requested: number | null;
  loan_tenure_months: number | null;
  purpose: string | null;
  full_name: string | null;
  dob: string | null;
  gender: string | null;
  pan_number: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  pincode: string | null;
  employment_type: EmploymentType | null;
  company_name: string | null;
  designation: string | null;
  monthly_income: number | null;
  work_experience_years: number | null;
  existing_emi: number;
  cibil_score: number | null;
  preferred_bank: string | null;
  admin_notes: string | null;
  assigned_to: string | null;
  approved_amount: number | null;
  approved_rate: number | null;
  rejection_reason: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_type: DocumentType;
  storage_path: string;
  file_name: string;
  file_size: number | null;
  mime_type: string | null;
  verified: boolean;
  uploaded_at: string;
}

export interface CreditCorrectionRequest {
  id: string;
  user_id: string;
  request_number: string;
  current_score: number | null;
  issues: string[];
  status: "submitted" | "in_progress" | "resolved" | "closed";
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  source: string | null;
  loan_amount: number | null;
  created_at: string;
}
