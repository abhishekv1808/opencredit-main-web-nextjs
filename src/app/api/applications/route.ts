import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("loan_applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Generate application number
  const { count } = await supabase
    .from("loan_applications")
    .select("*", { count: "exact", head: true });
  const seq = String((count || 0) + 1).padStart(5, "0");
  const appNumber = `OC-${new Date().getFullYear()}-${seq}`;

  const { data, error } = await supabase
    .from("loan_applications")
    .insert({
      user_id: user.id,
      application_number: appNumber,
      product_type: "personal_loan",
      status: "draft",
      ...body,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
