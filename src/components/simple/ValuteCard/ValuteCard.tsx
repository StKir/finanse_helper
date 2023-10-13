import { FC } from 'react';
import styles from './valuteCard.module.scss';
import { TValuteRes } from '@/interfaces/store.interfaces';

type TVaputeCardProps = Pick<
	TValuteRes,
	'CharCode' | 'Nominal' | 'Value' | 'Previous'
>;

type YDifferenceObj = {
	value: string;
	sign: '+' | '-';
};

const ValuteCard: FC<TVaputeCardProps> = ({
	CharCode,
	Nominal,
	Value,
	Previous
}) => {
	const getDifference = (): YDifferenceObj => {
		return {
			value: (Value / Nominal - Previous / Nominal).toFixed(2),
			sign: Value / Nominal - Previous / Nominal >= 0 ? '+' : '-'
		};
	};
	const rate = getDifference();
	return (
		<div className={styles.valute_card_wrp}>
			<div className={styles.valute_card_name_wrp}>
				<h3>{CharCode}</h3>
				<span
					style={
						rate.sign === '+' ? { color: '#2CD981' } : { color: '#FF4B32' }
					}
				>
					{rate.sign === '+' && '+'}
					{rate.value}
				</span>
			</div>
			<span>{(Value / Nominal).toFixed(2)}₽</span>
		</div>
	);
};

export default ValuteCard;
