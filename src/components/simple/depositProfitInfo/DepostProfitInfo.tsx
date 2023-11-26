import { moneyFormat } from '@/services/moneyFormat';
import { FC } from 'react';
import styles from './depostProfitInfo.module.scss';

type TDepostProfit = {
	profit: number;
	initial: number;
};

const DepositProfitInfo: FC<TDepostProfit> = ({ profit, initial }) => {
	const profitPercent = profit / (initial / 100);

	if (profit == 0 || initial == 0) {
		return;
	}

	return (
		<div className={styles.profit_info}>
			<h4>Начисленные проценты: {moneyFormat(profit.toFixed(2)) + '₽'}</h4>
			<h4>
				Сумма вклада с процентами :{' '}
				{moneyFormat((profit + initial).toFixed(2)) + '₽'}
			</h4>
			<h4>Прирост капиталла: {moneyFormat(profitPercent.toFixed(1)) + '%'}</h4>
		</div>
	);
};

export default DepositProfitInfo;
