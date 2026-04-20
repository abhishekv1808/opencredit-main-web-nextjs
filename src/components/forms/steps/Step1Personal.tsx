import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationData } from "../LoanApplicationForm";

interface StepProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
}

export default function Step1Personal({ data, updateData }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-1.5 block">Full Name (as per PAN) *</Label>
        <Input
          required
          placeholder="Your full legal name"
          value={data.full_name}
          onChange={(e) => updateData({ full_name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">Date of Birth *</Label>
          <Input
            type="date"
            required
            value={data.dob}
            onChange={(e) => updateData({ dob: e.target.value })}
            max={new Date(Date.now() - 21 * 365.25 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]}
          />
        </div>
        <div>
          <Label className="mb-1.5 block">Gender *</Label>
          <select
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            value={data.gender}
            onChange={(e) => updateData({ gender: e.target.value })}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">PAN Card Number *</Label>
        <Input
          required
          placeholder="ABCDE1234F"
          maxLength={10}
          value={data.pan_number}
          onChange={(e) =>
            updateData({ pan_number: e.target.value.toUpperCase() })
          }
          className="font-mono uppercase"
        />
        <p className="text-xs text-text-muted mt-1">
          PAN is required for credit assessment. Last 4 digits stored securely.
        </p>
      </div>

      <div>
        <Label className="mb-1.5 block">Mobile Number *</Label>
        <Input
          required
          type="tel"
          placeholder="10-digit mobile number"
          maxLength={10}
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value.replace(/\D/g, "") })}
          className="font-mono"
        />
      </div>
    </div>
  );
}
