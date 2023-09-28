import { TColums } from '@/interfaces/component.interface';

export const columns: TColums[] = [
	{
		title: 'Месяц',
		dataIndex: 'Месяц',
		key: 'Месяц'
	},
	{
		title: 'Сумма платежа',
		dataIndex: 'Сумма платежа',
		key: 'Сумма платежа'
	},
	{
		title: 'Платеж по основному долгу',
		dataIndex: 'Платеж по основному долгу',
		key: 'Платеж по основному долгу'
	},
	{
		title: 'Платеж по процентам',
		dataIndex: 'Платеж по процентам',
		key: 'Платеж по процентам'
	},
	{
		title: 'Остаток долга',
		dataIndex: 'Остаток долга',
		key: 'Остаток долга'
	}
];
