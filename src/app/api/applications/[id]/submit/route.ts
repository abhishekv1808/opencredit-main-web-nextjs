import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: app } = await supabase
    .from("loan_applications")
    .select("user_id, status, full_name, loan_amount_requested, application_number")
    .eq("id", id)
    .single();

  if (!app || app.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (app.status !== "draft") {
    return NextResponse.json({ error: "Application already submitted" }, { status: 400 });
  }

  const { error } = await supabase
    .from("loan_applications")
    .update({
      status: "submitted",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `OpenCredit <${process.env.RESEND_FROM_EMAIL}>`,
      to: user.email!,
      subject: `Application ${app.application_number} Submitted — OpenCredit.Money`,
      html: `
        <h2>Application Received!</h2>
        <p>Dear ${app.full_name || "Applicant"},</p>
        <p>Your loan application <strong>${app.application_number}</strong> has been successfully submitted.</p>
        <p>Our team will review your application within 24–72 hours and contact you.</p>
        <hr/>
        <p style="font-size:12px;color:#666">
          Interest rates: 10.25%–36% p.a. | Subject to credit approval by partner lenders.<br/>
          OpenCredit is a loan marketplace/DSA. Loans disbursed by RBI registered partner banks/NBFCs.
        </p>
      `,
    });
  } catch {
    // Email failure shouldn't block submission
  }

  return NextResponse.json({ success: true, applicationNumber: app.application_number });
}
