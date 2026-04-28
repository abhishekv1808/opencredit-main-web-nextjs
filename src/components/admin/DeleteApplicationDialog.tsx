"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export default function DeleteApplicationDialog({
  applicationId,
  applicationNumber,
  trigger,
  redirectTo,
}: {
  applicationId: string;
  applicationNumber: string;
  trigger?: React.ReactNode;
  redirectTo?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Deleted", description: `Application ${applicationNumber} has been permanently deleted.` });
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.refresh();
        }
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Failed to delete", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm" className="gap-1.5">
            <Trash2 size={13} /> Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg lg:text-xl">Delete Application {applicationNumber}?</AlertDialogTitle>
          <AlertDialogDescription className="text-[10px] lg:text-sm">
            This will permanently delete this loan application and all associated documents. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[10px] lg:text-sm h-8 lg:h-10">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[10px] lg:text-sm h-8 lg:h-10"
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
