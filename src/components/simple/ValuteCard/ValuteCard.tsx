import { FC } from 'react';
import styles from './valuteCard.module.scss';
import { TValuteRes } from '@/interfaces/store.interfaces';

type TVaputeCardProps = Pick<TValuteRes, 'CharCode' | 'Nominal' | 'Value'>;

const ValuteCard: FC<TVaputeCardProps> = ({ CharCode, Nominal, Value }) => {
	return (
		<div className={styles.valute_card_wrp}>
			<h3>{CharCode}</h3>
			<span>{(Value / Nominal).toFixed(3)}₽</span>
		</div>
	);
};

export default ValuteCard;
