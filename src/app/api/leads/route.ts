import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();
  const { name, phone, email, source, loan_amount } = body;

  if (!phone) {
    return NextResponse.json({ error: "Phone number required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({ name, phone, email, source, loan_amount })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Notify admin
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `OpenCredit <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.RESEND_ADMIN_EMAIL!,
      subject: `New Lead — ${source || "Website"} — ${name || phone}`,
      html: `
        <p><strong>New lead from:</strong> ${source}</p>
        <p><strong>Name:</strong> ${name || "—"}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "—"}</p>
        <p><strong>Loan Amount:</strong> ₹${loan_amount?.toLocaleString("en-IN") || "—"}</p>
      `,
    });
  } catch {
    // Non-blocking
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
