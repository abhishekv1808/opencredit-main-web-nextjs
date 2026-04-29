import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Ensure a profiles row exists for this user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert(
          {
            id: user.id,
            email: user.email,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id", ignoreDuplicates: true }
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
