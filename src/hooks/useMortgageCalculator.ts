import { MortgageData, MortgageInput } from '@/interfaces/mortgage.interface';
import { useState } from 'react';

function useMortgageCalculator() {
	const [mortgageData, setMortgageData] = useState<MortgageData[]>([]);

	const calculateMortgage = (mortgageInput: MortgageInput) => {
		let remainingLoan = mortgageInput.propertyPrice - mortgageInput.downPayment;

		const monthlyInterestRate = mortgageInput.interestRate / 100 / 12;
		const isAnnuitant = mortgageInput.paymentType === 'Аннуитетные';

		const monthlyPayment = isAnnuitant
			? (remainingLoan * monthlyInterestRate) /
			  (1 - Math.pow(1 + monthlyInterestRate, -mortgageInput.loanTermMonths))
			: remainingLoan / mortgageInput.loanTermMonths;

		const newData: MortgageData[] = [];

		for (let month = 1; month <= mortgageInput.loanTermMonths; month++) {
			const interestPayment = remainingLoan * monthlyInterestRate;
			const principalPayment = isAnnuitant
				? monthlyPayment - interestPayment
				: monthlyPayment;

			remainingLoan = remainingLoan - principalPayment;

			newData.push({
				Месяц: month,
				'Сумма платежа': monthlyPayment.toFixed(2),
				'Платеж по основному долгу': principalPayment.toFixed(2),
				'Платеж по процентам': interestPayment.toFixed(2),
				'Остаток долга': remainingLoan.toFixed(2)
			});
		}
		setMortgageData(newData);
	};

	return {
		mortgageData,
		calculateMortgage
	};
}

export default useMortgageCalculator;
