// Интерфейс для параметров вклада
export interface InvestmentParams {
	initialDepositAmount: number;
	investmentTermMonths: number;
	interestRate: number;
	paymentFrequency: number;
	compoundInterest: boolean;
	startDate: string | any;
}

// Интерфейс для данных о доходности
export interface InvestmentData {
	Дата: string;
	'Начислено процентов': string;
	'Изменение баланса': string;
	Баланс: string;
}
