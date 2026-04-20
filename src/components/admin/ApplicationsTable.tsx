"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search, MoreHorizontal, Eye, Pencil, Trash2,
  Download, RefreshCw, ChevronLeft, ChevronRight,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import CreateApplicationModal from "./CreateApplicationModal";
import EditApplicationModal from "./EditApplicationModal";
import DeleteApplicationDialog from "./DeleteApplicationDialog";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" | "gold" | "outline" }> = {
  draft: { label: "Draft", variant: "secondary" },
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" },
  disbursed: { label: "Disbursed", variant: "success" },
};

interface Application {
  id: string;
  application_number: string;
  full_name?: string;
  phone?: string;
  email?: string;
  pan_number?: string;
  gender?: string;
  employment_type?: string;
  company_name?: string;
  designation?: string;
  monthly_income?: number;
  existing_emi?: number;
  loan_amount_requested?: number;
  loan_tenure_months?: number;
  purpose?: string;
  status: string;
  admin_notes?: string;
  cibil_score?: number;
  approved_amount?: number;
  approved_rate?: number;
  rejection_reason?: string;
  created_at: string;
  product_type?: string;
}

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 15;
  const router = useRouter();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("perPage", perPage.toString());
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (productFilter !== "all") params.set("product_type", productFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      if (res.ok) {
        setApplications(data.data || []);
        setCount(data.count || 0);
      }
    } catch {
      toast({ title: "Error", description: "Failed to load applications", variant: "destructive" });
    }
    setLoading(false);
  }, [page, statusFilter, productFilter, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchApplications();
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const totalPages = Math.ceil(count / perPage);

  const handleQuickStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast({ title: "Status Updated", description: `Changed to ${statusConfig[newStatus]?.label}` });
        fetchApplications();
      }
    } catch {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleExportCSV = () => {
    if (!applications.length) return;
    const headers = ["Application #", "Applicant", "Phone", "Amount", "Employment", "Status", "Date"];
    const rows = applications.map((a) => [
      a.application_number, a.full_name || "", a.phone || "",
      a.loan_amount_requested?.toString() || "", a.employment_type || "",
      a.status, a.created_at,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "CSV file downloaded" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-heading">
            Loan Applications
          </h1>
          <p className="text-text-muted text-sm mt-0.5">{count} total applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1.5">
            <Download size={14} /> Export CSV
          </Button>
          <CreateApplicationModal />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs 
            defaultValue="all" 
            value={productFilter} 
            onValueChange={(v: string) => { setProductFilter(v); setPage(1); }}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-white border border-gray-100 p-1 rounded-xl h-10 shadow-sm">
              <TabsTrigger value="all" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="personal_loan" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                Personal
              </TabsTrigger>
              <TabsTrigger value="home_loan" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                Home Loan
              </TabsTrigger>
              <TabsTrigger value="credit_correction" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                CIBIL
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" onClick={fetchApplications} className="gap-1.5 h-9 text-xs font-bold">
              <RefreshCw size={14} className={cn(loading && "animate-spin")} /> Refresh
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-sm bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v: string) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-xl bg-gray-50/50 border-gray-100 font-medium">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <DropdownMenuSeparator className="sm:hidden" />
              {Object.entries(statusConfig).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0F2347] text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold">Application #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Applicant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex items-center justify-center gap-2 text-text-muted">
                      <RefreshCw size={16} className="animate-spin" />
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={32} className="text-gray-300" />
                      <p className="text-text-muted text-sm">No applications found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.draft;
                  return (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-4 py-3">
                        <Link href={`/admin/applications/${app.id}`} className="font-mono text-xs font-bold text-heading hover:text-brand-green transition-colors">
                          {app.application_number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-primary max-w-[150px] truncate font-medium">
                        {app.full_name || "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted font-mono">
                        {app.phone || "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap">
                        {app.loan_amount_requested ? formatCurrency(app.loan_amount_requested) : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted capitalize whitespace-nowrap">
                        {app.product_type === "home_loan" ? (
                          <span className="font-semibold" style={{ color: "#1B3A6B" }}>Home Loan</span>
                        ) : app.employment_type?.replace("_", " ") || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant} className="text-[10px] whitespace-nowrap">
                          {status.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-60 hover:opacity-100">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/applications/${app.id}`} className="gap-2 cursor-pointer">
                                <Eye size={13} /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <EditApplicationModal
                              application={app}
                              trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer">
                                  <Pencil size={13} /> Edit Application
                                </DropdownMenuItem>
                              }
                            />
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs">Quick Status</DropdownMenuLabel>
                            {app.status === "submitted" && (
                              <DropdownMenuItem onClick={() => handleQuickStatus(app.id, "under_review")} className="gap-2 cursor-pointer">
                                Mark Under Review
                              </DropdownMenuItem>
                            )}
                            {["submitted", "under_review"].includes(app.status) && (
                              <DropdownMenuItem onClick={() => handleQuickStatus(app.id, "approved")} className="gap-2 cursor-pointer text-green-600">
                                Approve
                              </DropdownMenuItem>
                            )}
                            {app.status === "approved" && (
                              <DropdownMenuItem onClick={() => handleQuickStatus(app.id, "disbursed")} className="gap-2 cursor-pointer text-green-600">
                                Mark Disbursed
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DeleteApplicationDialog
                              applicationId={app.id}
                              applicationNumber={app.application_number}
                              trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer text-red-600">
                                  <Trash2 size={13} /> Delete
                                </DropdownMenuItem>
                              }
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Page {page} of {totalPages} · {count} total
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = page <= 3 ? i + 1 : page - 2 + i;
                if (pageNum > totalPages || pageNum < 1) return null;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className="h-8 w-8 p-0 text-xs"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
