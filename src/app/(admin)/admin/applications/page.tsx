"use client";

import { Suspense } from "react";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export default function AdminApplicationsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-sm text-gray-400">Loading…</div>}>
        <ApplicationsTable />
      </Suspense>
    </div>
  );
}
