export interface PaymentDataExcelExporterProps {
	paymentData: MortgageData[];
}

export interface MortgageInput {
	propertyPrice: number;
	downPayment: number;
	loanTermMonths: number;
	interestRate: number;
	paymentType: 'Аннуитетные' | 'Дифференцированные';
}

export interface MortgageData {
	Месяц: number;
	'Сумма платежа': string;
	'Платеж по основному долгу': string;
	'Платеж по процентам': string;
	'Остаток долга': string;
}
