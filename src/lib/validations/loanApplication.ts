import { z } from "zod";

export const step1Schema = z.object({
  full_name: z.string().min(3, "Enter your full legal name").max(100),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], { required_error: "Select gender" }),
  pan_number: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN (e.g. ABCDE1234F)"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

export const step2Schema = z.object({
  address_line1: z.string().min(5, "Enter your complete address"),
  address_line2: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
});

export const step3Schema = z.object({
  employment_type: z.enum(["salaried", "self_employed", "business"]),
  company_name: z.string().min(2, "Enter company/business name"),
  designation: z.string().min(2, "Enter your designation"),
  monthly_income: z.number().min(10000, "Minimum income ₹10,000"),
  work_experience_years: z.number().min(0).max(50),
  existing_emi: z.number().min(0),
});

export const step4Schema = z.object({
  loan_amount_requested: z
    .number()
    .min(50000, "Minimum loan amount ₹50,000")
    .max(4000000, "Maximum loan amount ₹40,00,000"),
  loan_tenure_months: z
    .number()
    .min(12, "Minimum tenure 12 months")
    .max(60, "Maximum tenure 60 months"),
  purpose: z.string().min(1, "Select loan purpose"),
  cibil_score: z.number().min(300).max(900).optional(),
  preferred_bank: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
