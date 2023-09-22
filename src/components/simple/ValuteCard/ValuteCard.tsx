import styles from './valuteCard.module.scss';

const ValuteCard = () => {
	return (
		<div className={styles.valute_card_wrp}>
			<h3>USD</h3>
			<span>84.96₽</span>
		</div>
	);
};

export default ValuteCard;
