import TitleDescription from '@/components/ui/TitleDescription/TitleDescription';
import { Collapse } from 'antd';
import TableSection from '../Table/Table';
import { useAppSelector } from '@/store/store';
import { ISavedData } from '@/interfaces/store.interfaces';
import { getAllMortgageSelector } from '@/store/slices/SavedSlice';
import { columns } from '../Table/constants';
import styles from './mortgageItem.module.scss';
import PaymentDataExcelExporter from '@/components/smart/mortgageExcelDownload/PaymentDataExcelExporter';
import { moneyFormat } from '@/services/moneyFormat';

const MortgageItem = () => {
	const AllMortgage = useAppSelector(getAllMortgageSelector);

	const getItems = (array: ISavedData[]) => {
		if (array) {
			return array
				.map((el, i) => {
					return {
						key: i,
						label: el.name,
						children: (
							<div>
								<div className={styles.initial_data}>
									<div>
										<span className={styles.initial_title}>Тип платежей:</span>
										<span>{el.initial.paymentType}</span>
									</div>
									<div>
										<span className={styles.initial_title}>
											Стоимость недвижимости:
										</span>
										<span>{moneyFormat(el.initial.propertyPrice)}₽</span>
									</div>
									<div>
										<span className={styles.initial_title}>
											Первоначальный взнос:
										</span>
										<span>{moneyFormat(el.initial.downPayment)}₽</span>
									</div>
									<div>
										<span className={styles.initial_title}>Срок кредита:</span>
										<span>{el.initial.loanTermMonths} месяцев</span>
									</div>
									<div>
										<span className={styles.initial_title}>
											Процентная ставка:
										</span>
										<span>{el.initial.interestRate}%</span>
									</div>
									<PaymentDataExcelExporter
										name={el.name}
										paymentData={el.data}
									/>
								</div>
								<TableSection paymentData={el.data} columns={columns} />
							</div>
						)
					};
				})
				.reverse();
		}
		return [];
	};
	const itemsMortgage = getItems(AllMortgage);

	return (
		<section>
			<TitleDescription>Расчеты ипотеки</TitleDescription>
			{AllMortgage.length ? (
				<Collapse collapsible='header' items={itemsMortgage} />
			) : (
				'Вы еще не сохраняли расчеты'
			)}
		</section>
	);
}; //Компонент Ипотеки

export default MortgageItem;
