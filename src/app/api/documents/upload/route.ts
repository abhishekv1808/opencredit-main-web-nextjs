import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export async function POST(req: Request) {
  // 1. Verify user session with normal client
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const applicationId = formData.get("applicationId") as string;
  const documentType = formData.get("documentType") as string;

  if (!file || !applicationId || !documentType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF, JPG, PNG allowed." }, { status: 400 });
  }

  // 2. Verify application belongs to this user
  const { data: app } = await supabase
    .from("loan_applications")
    .select("user_id")
    .eq("id", applicationId)
    .single();

  if (!app || app.user_id !== user.id) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // 3. Use service client for storage + DB inserts (bypasses RLS — ownership already verified above)
  const admin = createServiceClient();

  const ext = file.name.split(".").pop();
  const fileName = `${user.id}/${applicationId}/${documentType}_${Date.now()}.${ext}`;

  const { data: uploadData, error: uploadError } = await admin.storage
    .from("loan-documents")
    .upload(fileName, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Remove any existing record for this doc type before inserting
  await admin
    .from("application_documents")
    .delete()
    .eq("application_id", applicationId)
    .eq("document_type", documentType);

  const { error: dbError } = await admin
    .from("application_documents")
    .insert({
      application_id: applicationId,
      document_type: documentType,
      storage_path: uploadData.path,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
    });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: uploadData.path });
}
