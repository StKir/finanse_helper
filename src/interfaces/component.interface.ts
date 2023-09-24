import { MortgageData } from './mortgage.interface';

export interface TColums {
	title: string;
	dataIndex: string;
	key: string;
}

export interface ITable {
	paymentData: MortgageData[];
	columns: TColums[];
}
