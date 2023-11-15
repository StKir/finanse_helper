import { MortgageData, MortgageInput } from '@/interfaces/mortgage.interface';
import { moneyFormat } from '@/services/moneyFormat';
import { useState } from 'react';

function useMortgageCalculator() {
	const [mortgageData, setMortgageData] = useState<MortgageData[]>([]);
	const [mortgageInput, setMortgageInput] = useState<MortgageInput>();
	const [overpayment, setOverpayment] = useState<number>(0);

	const calculateMortgage = (mortgageInput: MortgageInput) => {
		setMortgageInput(mortgageInput);
		let remainingLoan = mortgageInput.propertyPrice - mortgageInput.downPayment;
		setOverpayment(remainingLoan);
		const monthlyInterestRate = mortgageInput.interestRate / 100 / 12;
		const isAnnuitant = mortgageInput.paymentType === 'Аннуитетные';

		const monthlyPayment = isAnnuitant
			? (remainingLoan * monthlyInterestRate) /
			  (1 - Math.pow(1 + monthlyInterestRate, -mortgageInput.loanTermMonths))
			: remainingLoan / mortgageInput.loanTermMonths +
			  remainingLoan * monthlyInterestRate;

		const newData: MortgageData[] = [];

		for (let month = 1; month <= mortgageInput.loanTermMonths; month++) {
			const interestPayment = remainingLoan * monthlyInterestRate;
			const principalPayment = isAnnuitant
				? monthlyPayment - interestPayment
				: monthlyPayment - remainingLoan * monthlyInterestRate;

			remainingLoan = remainingLoan - principalPayment;
			setOverpayment((num) => num - monthlyPayment);
			newData.push({
				Месяц: month,
				'Сумма платежа': moneyFormat(monthlyPayment.toFixed(2)) + '₽',
				'Платеж по основному долгу':
					moneyFormat(principalPayment.toFixed(2)) + '₽',
				'Платеж по процентам': moneyFormat(interestPayment.toFixed(2)) + '₽',
				'Остаток долга': moneyFormat(remainingLoan.toFixed(2)) + '₽'
			});
		}
		setMortgageData(newData);
	};

	return {
		mortgageData,
		calculateMortgage,
		mortgageInput,
		overpayment
	};
}

export default useMortgageCalculator;
