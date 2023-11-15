import { FC } from 'react';
import styles from './overpriceTable.module.scss';
import { moneyFormat } from '@/services/moneyFormat';

type ToverPriceProps = {
	overprice: number;
	initialValue: number;
};

const OverPriceTable: FC<ToverPriceProps> = ({ overprice, initialValue }) => {
	return (
		<div className={styles.overprivce_wrp}>
			<span className={styles.overpayment}>
				Выплачено всего: {moneyFormat(initialValue + -overprice) + '₽'}
			</span>
			<span
				className={styles.overpayment}
				style={
					initialValue / -overprice > 3
						? { border: '1px solid green' }
						: { border: '1px solid red' }
				}
			>
				Переплата: {moneyFormat(-overprice.toFixed(2)) + '₽'}
			</span>
			<span>
				{initialValue / -overprice > 3
					? 'Такая переплата считается нормальной'
					: 'Переплата превышает 1/3 стоимости кредита'}
			</span>
		</div>
	);
};

export default OverPriceTable;
