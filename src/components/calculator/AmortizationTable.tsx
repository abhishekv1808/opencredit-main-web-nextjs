import { AmortizationRow } from "@/lib/utils/emi";
import { formatCurrency } from "@/lib/utils/format";

interface AmortizationTableProps {
  schedule: AmortizationRow[];
}

export default function AmortizationTable({ schedule }: AmortizationTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-display text-xl font-bold text-heading">
          Amortization Schedule
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Monthly breakdown of principal, interest and outstanding balance
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-blue text-white">
              <th className="px-4 py-3 text-left font-semibold text-xs">
                Month
              </th>
              <th className="px-4 py-3 text-right font-semibold text-xs">
                EMI (₹)
              </th>
              <th className="px-4 py-3 text-right font-semibold text-xs">
                Principal (₹)
              </th>
              <th className="px-4 py-3 text-right font-semibold text-xs">
                Interest (₹)
              </th>
              <th className="px-4 py-3 text-right font-semibold text-xs">
                Balance (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr
                key={row.month}
                className="border-b border-gray-50 hover:bg-brand-blue-light/50 transition-colors"
              >
                <td className="px-4 py-3 text-text-muted font-mono text-xs">
                  {row.month}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-heading">
                  {row.emi.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-green-700">
                  {row.principal.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-brand-teal">
                  {row.interest.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-text-primary font-medium">
                  {row.balance.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td className="px-4 py-3 text-text-primary text-xs">Total</td>
              <td className="px-4 py-3 text-right font-mono text-xs text-heading">
                {schedule
                  .reduce((sum, r) => sum + r.emi, 0)
                  .toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right font-mono text-xs text-green-700">
                {schedule
                  .reduce((sum, r) => sum + r.principal, 0)
                  .toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right font-mono text-xs text-brand-teal">
                {schedule
                  .reduce((sum, r) => sum + r.interest, 0)
                  .toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right text-xs text-green-600">
                ✓ Paid Off
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
