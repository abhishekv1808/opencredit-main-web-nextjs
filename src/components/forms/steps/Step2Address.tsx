import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationData } from "../LoanApplicationForm";

interface StepProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
}

export default function Step2Address({ data, updateData }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-1.5 block">Address Line 1 *</Label>
        <Input
          required
          placeholder="Flat/House no., Building, Street"
          value={data.address_line1}
          onChange={(e) => updateData({ address_line1: e.target.value })}
        />
      </div>

      <div>
        <Label className="mb-1.5 block">Address Line 2</Label>
        <Input
          placeholder="Area, Landmark (optional)"
          value={data.address_line2}
          onChange={(e) => updateData({ address_line2: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">City</Label>
          <Input value="Bangalore" readOnly className="bg-gray-50 text-text-muted" />
        </div>
        <div>
          <Label className="mb-1.5 block">State</Label>
          <Input value="Karnataka" readOnly className="bg-gray-50 text-text-muted" />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">PIN Code *</Label>
        <Input
          required
          type="text"
          placeholder="560001"
          maxLength={6}
          value={data.pincode}
          onChange={(e) =>
            updateData({ pincode: e.target.value.replace(/\D/g, "") })
          }
          className="font-mono"
        />
      </div>

      <div className="bg-brand-blue-light rounded-xl p-4">
        <p className="text-xs text-heading leading-relaxed">
          <strong>Currently serving:</strong> Bangalore and surrounding areas
          in Karnataka. We are expanding to more cities soon.
        </p>
      </div>
    </div>
  );
}
