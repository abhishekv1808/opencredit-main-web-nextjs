export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    return {
      emi: principal / tenureMonths,
      totalAmount: principal,
      totalInterest: 0,
    };
  }
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalAmount = emi * tenureMonths;
  return {
    emi,
    totalAmount,
    totalInterest: totalAmount - principal,
  };
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number
): AmortizationRow[] {
  const monthlyRate = annualRate / 12 / 100;
  const { emi } = calculateEMI(principal, annualRate, tenureMonths);
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    schedule.push({
      month,
      emi: Math.round(emi),
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    });
  }
  return schedule;
}
