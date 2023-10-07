import {
	InvestmentData,
	InvestmentParams
} from '@/interfaces/component.interface';
import { moneyFormat } from '@/services/moneyFormat';
import { useState } from 'react';

const useInvestmentCalculator = () => {
	const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);

	// const getEffectiverate = (
	// 	rete: number,
	// 	paymentFrequency: number,
	// 	investmentTermMonths: number
	// ) => {
	// 	return (
	// 		(1 + ((rete / 100 / investmentTermMonths) % paymentFrequency)) **
	// 			((investmentTermMonths % paymentFrequency) - 1) *
	// 		100
	// 	);
	// };

	const calculateInvestment = (investmentInput: InvestmentParams) => {
		const data: InvestmentData[] = [];
		let depositAmount = investmentInput.initialDepositAmount;
		let currentDate = new Date(investmentInput.startDate);
		// eggectiveStavka =  (1* (investmentInput.interestRate/100)/investmentInput.paymentFrequency)*investmentInput.paymentFrequency*m −1
		for (
			let month = 1;
			month <= investmentInput.investmentTermMonths;
			month++
		) {
			let monthlyInterest = 0;
			// const effectiveRate = getEffectiverate(
			// 	investmentInput.interestRate,
			// 	investmentInput.paymentFrequency,
			// 	investmentInput.investmentTermMonths
			// );
			// console.log(effectiveRate);

			monthlyInterest =
				(depositAmount * investmentInput.interestRate) / 12 / 100;

			if (investmentInput.compoundInterest) {
				depositAmount += monthlyInterest;
			}
			data.push({
				Дата: currentDate.toDateString(),
				'Начислено процентов': moneyFormat(monthlyInterest.toFixed(2)) + '₽',
				'Изменение баланса':
					'+' +
					moneyFormat(
						(
							monthlyInterest +
							(investmentInput.compoundInterest ? 0 : depositAmount)
						).toFixed(2)
					) +
					'₽',
				Баланс: moneyFormat(depositAmount.toFixed(2)) + '₽'
			});

			currentDate.setMonth(currentDate.getMonth() + 1);
		}
		setInvestmentData(data);
	};

	return { investmentData, calculateInvestment };
};

export default useInvestmentCalculator;
