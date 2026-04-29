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
    .select("user_id, status, full_name, phone, email, loan_amount_requested, application_number, product_type, employment_type, monthly_income, purpose, loan_tenure_months, cibil_score, preferred_bank, company_name, designation, existing_emi, address_line1, pincode")
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

  // Determine product label for emails
  const productLabel =
    app.product_type === "home_loan" ? "Home Loan" :
    app.product_type === "personal_loan" ? "Personal Loan" :
    app.product_type || "Loan";

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1️⃣ Confirmation email to the applicant
  try {
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
  } catch (err) {
    console.error("[SUBMIT] User confirmation email failed:", err);
  }

  // 2️⃣ Lead notification email to admin
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;
  console.log("[SUBMIT] Sending admin lead notification to:", adminEmail);
  if (adminEmail) {
    try {
      const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const result = await resend.emails.send({
        from: `OpenCredit <${process.env.RESEND_FROM_EMAIL}>`,
        to: adminEmail,
        subject: `🔔 New ${productLabel} Lead — ${app.full_name || "Unknown"} — ${app.application_number}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);padding:28px 32px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">🔔 New ${productLabel} Application</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Lead generated on ${submittedAt}</p>
            </div>

            <div style="padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
              <!-- Application Number Badge -->
              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin-bottom:24px;text-align:center;">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#16a34a;font-weight:700;">Application Number</span><br/>
                <span style="font-size:20px;font-weight:800;color:#15803d;font-family:monospace;">${app.application_number}</span>
              </div>

              <!-- Applicant Details -->
              <h3 style="margin:0 0 12px;font-size:14px;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #f0fdf4;padding-bottom:8px;">👤 Applicant Details</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
                <tr><td style="padding:8px 0;color:#6b7280;width:40%;">Full Name</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.full_name || "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Phone</td><td style="padding:8px;color:#111827;font-weight:600;">${app.phone || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.email || user.email || "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Address</td><td style="padding:8px;color:#111827;font-weight:600;">${app.address_line1 || "—"}${app.pincode ? `, ${app.pincode}` : ""}</td></tr>
              </table>

              <!-- Loan Details -->
              <h3 style="margin:0 0 12px;font-size:14px;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #f0fdf4;padding-bottom:8px;">💰 Loan Details</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
                <tr><td style="padding:8px 0;color:#6b7280;width:40%;">Product Type</td><td style="padding:8px 0;color:#111827;font-weight:700;"><span style="background:#f0fdf4;border:1px solid #bbf7d0;padding:3px 10px;border-radius:20px;font-size:12px;color:#16a34a;">${productLabel}</span></td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Loan Amount</td><td style="padding:8px;color:#111827;font-weight:700;font-size:16px;">₹${app.loan_amount_requested?.toLocaleString("en-IN") || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Tenure</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.loan_tenure_months ? `${app.loan_tenure_months} months` : "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Purpose</td><td style="padding:8px;color:#111827;font-weight:600;">${app.purpose || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Preferred Bank</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.preferred_bank || "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">CIBIL Score</td><td style="padding:8px;color:#111827;font-weight:600;">${app.cibil_score || "—"}</td></tr>
              </table>

              <!-- Employment Details -->
              <h3 style="margin:0 0 12px;font-size:14px;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #f0fdf4;padding-bottom:8px;">🏢 Employment Details</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
                <tr><td style="padding:8px 0;color:#6b7280;width:40%;">Employment Type</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.employment_type || "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Company</td><td style="padding:8px;color:#111827;font-weight:600;">${app.company_name || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Designation</td><td style="padding:8px 0;color:#111827;font-weight:600;">${app.designation || "—"}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 8px;color:#6b7280;">Monthly Income</td><td style="padding:8px;color:#111827;font-weight:700;">₹${app.monthly_income?.toLocaleString("en-IN") || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Existing EMI</td><td style="padding:8px 0;color:#111827;font-weight:600;">₹${app.existing_emi?.toLocaleString("en-IN") || "0"}</td></tr>
              </table>

              <!-- Footer -->
              <div style="background:#f9fafb;border-radius:8px;padding:16px;text-align:center;margin-top:8px;">
                <p style="margin:0;font-size:12px;color:#6b7280;">This is an automated notification from <strong>OpenCredit.Money</strong></p>
                <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">Please review and follow up with the applicant promptly.</p>
              </div>
            </div>
          </div>
        `,
      });
      console.log("[SUBMIT] Admin email sent successfully:", JSON.stringify(result));
    } catch (err) {
      console.error("[SUBMIT] Admin lead notification email FAILED:", err);
    }
  } else {
    console.warn("[SUBMIT] RESEND_ADMIN_EMAIL not set — skipping admin notification");
  }

  return NextResponse.json({ success: true, applicationNumber: app.application_number });
}
