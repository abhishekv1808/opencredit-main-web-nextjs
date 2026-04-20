import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") return null;
  return user;
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Use service client to bypass RLS — admin already verified above
  const db = createServiceClient();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const productType = searchParams.get("product_type");
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 20);

  let query = db.from("loan_applications").select("*", { count: "exact" });

  if (status && status !== "all") query = query.eq("status", status);
  if (productType && productType !== "all") query = query.eq("product_type", productType);
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,application_number.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  query = query
    .order("created_at", { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count, page, perPage });
}

export async function POST(req: Request) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const db = createServiceClient();
  const body = await req.json();

  const year = new Date().getFullYear();
  const { data: lastApp } = await db
    .from("loan_applications")
    .select("application_number")
    .like("application_number", `OC-${year}-%`)
    .order("application_number", { ascending: false })
    .limit(1)
    .single();
  const lastSeq = lastApp?.application_number
    ? parseInt(lastApp.application_number.split("-").pop() || "0", 10)
    : 0;
  const appNumber = `OC-${year}-${String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(5, "0")}`;

  const { data, error } = await db
    .from("loan_applications")
    .insert({
      application_number: appNumber,
      product_type: body.product_type || "personal_loan",
      status: body.status || "submitted",
      full_name: body.full_name,
      phone: body.phone,
      email: body.email,
      pan_number: body.pan_number,
      dob: body.dob || null,
      gender: body.gender || null,
      employment_type: body.employment_type || null,
      company_name: body.company_name || null,
      designation: body.designation || null,
      monthly_income: body.monthly_income ? Number(body.monthly_income) : null,
      work_experience_years: body.work_experience_years ? Number(body.work_experience_years) : null,
      existing_emi: body.existing_emi ? Number(body.existing_emi) : null,
      loan_amount_requested: body.loan_amount_requested ? Number(body.loan_amount_requested) : null,
      loan_tenure_months: body.loan_tenure_months ? Number(body.loan_tenure_months) : null,
      purpose: body.purpose || null,
      address: body.address_line1 || "",
      address_line1: body.address_line1 || null,
      address_line2: body.address_line2 || null,
      city: "Bangalore",
      state: "Karnataka",
      pincode: body.pincode || null,
      admin_notes: body.admin_notes || null,
      user_id: body.user_id || admin.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
