import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user.id).single();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : (user.email?.[0] || "U").toUpperCase();

  const kycColors = {
    verified: { bg: "#f0fdf4", color: "#16a34a", label: "Verified" },
    pending:  { bg: "#fffbeb", color: "#d97706", label: "Pending" },
    rejected: { bg: "#fef2f2", color: "#dc2626", label: "Rejected" },
  };
  const kyc = kycColors[(profile?.kyc_status as keyof typeof kycColors) || "pending"];

  return (
    <ProfileForm
      profile={{
        full_name: profile?.full_name ?? null,
        phone: profile?.phone ?? null,
        city: profile?.city ?? null,
        kyc_status: profile?.kyc_status ?? null,
        role: profile?.role ?? null,
      }}
      email={user.email || ""}
      initials={initials}
      kyc={kyc}
    />
  );
}
