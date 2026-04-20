import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const db = createServiceClient();
  const { data, error } = await db
    .from("loan_applications")
    .select("*, profiles(full_name, email, phone, kyc_status)")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const db = createServiceClient();
  const body = await req.json();

  const allowedFields = [
    "status", "admin_notes", "assigned_to",
    "approved_amount", "approved_rate", "rejection_reason",
    "full_name", "phone", "email", "pan_number", "dob", "gender",
    "employment_type", "company_name", "designation",
    "monthly_income", "work_experience_years", "existing_emi",
    "loan_amount_requested", "loan_tenure_months", "purpose",
    "address_line1", "address_line2", "pincode", "cibil_score",
    "product_type",
  ];

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const field of allowedFields) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  const { data, error } = await db
    .from("loan_applications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    if (body.status === "approved" || body.status === "rejected") {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data: applicantProfile } = await db
        .from("profiles")
        .select("email, full_name")
        .eq("id", data.user_id)
        .single();

      if (applicantProfile?.email) {
        const isApproved = body.status === "approved";
        await resend.emails.send({
          from: `OpenCredit <${process.env.RESEND_FROM_EMAIL}>`,
          to: applicantProfile.email,
          subject: `Application ${data.application_number} — ${isApproved ? "Approved!" : "Update"}`,
          html: isApproved
            ? `<p>Dear ${applicantProfile.full_name},</p><p>Your loan application <strong>${data.application_number}</strong> has been approved for ₹${body.approved_amount?.toLocaleString("en-IN")} at ${body.approved_rate}% p.a.</p>`
            : `<p>Dear ${applicantProfile.full_name},</p><p>Your application <strong>${data.application_number}</strong> could not be processed. Reason: ${body.rejection_reason}</p>`,
        });
      }
    }
  } catch {
    // Non-blocking — email failure shouldn't fail the request
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const db = createServiceClient();
  await db.from("application_documents").delete().eq("application_id", id);
  const { error } = await db.from("loan_applications").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
