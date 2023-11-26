import {
	InvestmentData,
	InvestmentParams
} from '@/interfaces/deposit.inteface';
import { moneyFormat } from '@/services/moneyFormat';
import { useState } from 'react';

const useInvestmentCalculator = () => {
	const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);
	const [investmentInput, setinvestmentInput] = useState<InvestmentParams>();
	const [investmentProfit, setInvestmentProfit] = useState<number>(0);

	const calculateInvestment = (investmentInput: InvestmentParams) => {
		setInvestmentProfit(0);
		setinvestmentInput(investmentInput);
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

			monthlyInterest =
				(depositAmount * investmentInput.interestRate) / 12 / 100;

			if (investmentInput.compoundInterest) {
				depositAmount += monthlyInterest;
			}
			setInvestmentProfit((num) => num + monthlyInterest);
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

	return {
		investmentData,
		calculateInvestment,
		investmentInput,
		investmentProfit
	};
};

export default useInvestmentCalculator;
