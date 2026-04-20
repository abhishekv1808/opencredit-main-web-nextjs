"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, Eye, CheckCircle2, XCircle, 
  Loader2, FileText, ExternalLink, ShieldCheck
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  verified: boolean;
  mime_type: string;
}

interface DocumentViewerProps {
  document: Document;
  onUpdate?: () => void;
  trigger?: React.ReactNode;
}

export default function DocumentViewer({ document, onUpdate, trigger }: DocumentViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isVerified, setIsVerified] = useState(document.verified);

  const fetchSignedUrl = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/documents/${document.id}`);
      const data = await res.json();
      if (res.ok) {
        setSignedUrl(data.url);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to get document URL",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Network error",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const toggleVerified = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/documents/${document.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !isVerified }),
      });
      if (res.ok) {
        setIsVerified(v => !v);
        toast({
          title: isVerified ? "Marked Unverified" : "Verified Successfully",
          description: "Document status updated.",
        });
        if (onUpdate) onUpdate();
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
    setUpdating(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchSignedUrl();
    }
  }, [isOpen]);

  const isImage = document.mime_type.startsWith("image/");
  const isPdf = document.mime_type === "application/pdf";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-bold uppercase tracking-wider">
            <Eye size={14} /> Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden bg-[#F8F9FB]">
        <DialogHeader className="p-4 bg-white border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
              <FileText size={18} className="text-brand-blue" />
            </div>
            <div>
              <DialogTitle className="text-sm font-bold text-heading">
                {document.document_type.replace(/_/g, " ").toUpperCase()}
              </DialogTitle>
              <p className="text-[10px] text-text-muted font-mono">{document.file_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-6">
            <Badge variant={isVerified ? "success" : "warning"} className="text-[10px] font-bold h-6">
              {isVerified ? "VERIFIED" : "PENDING VERIFICATION"}
            </Badge>
            <Button
              size="sm"
              variant={isVerified ? "outline" : "default"}
              onClick={toggleVerified}
              disabled={updating}
              className={cn(
                "h-8 gap-1.5 text-[10px] font-bold",
                !isVerified && "bg-brand-green hover:bg-brand-green/90"
              )}
            >
              {updating ? (
                <Loader2 size={12} className="animate-spin" />
              ) : isVerified ? (
                <XCircle size={14} />
              ) : (
                <ShieldCheck size={14} />
              )}
              {isVerified ? "Unverify" : "Verify Doc"}
            </Button>
            {signedUrl && (
              <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 text-[10px] font-bold">
                <a href={signedUrl} download={document.file_name}>
                  <Download size={14} /> Download
                </a>
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 bg-gray-900/5 relative overflow-auto flex items-center justify-center p-4">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <Loader2 size={32} className="animate-spin text-brand-blue" />
              <p className="text-xs font-bold uppercase tracking-widest">Loading Document...</p>
            </div>
          ) : signedUrl ? (
            <>
              {isImage && (
                <img
                  src={signedUrl}
                  alt={document.document_type}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              )}
              {isPdf && (
                <iframe
                  src={`${signedUrl}#toolbar=0`}
                  className="w-full h-full rounded-lg shadow-2xl bg-white"
                  title="Document Preview"
                />
              )}
              {!isImage && !isPdf && (
                <div className="bg-white p-12 rounded-3xl border border-gray-100 flex flex-col items-center gap-6 text-center max-w-sm">
                  <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center">
                    <FileText size={40} className="text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-heading mb-2">No Preview Available</h3>
                    <p className="text-sm text-text-muted font-medium">
                      This file format ({document.mime_type}) cannot be previewed directly in the browser.
                    </p>
                  </div>
                  <Button asChild className="w-full bg-[#0F2347]">
                    <a href={signedUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                      Download to View <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-text-muted text-sm font-bold uppercase tracking-widest">
              Failed to load preview
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
