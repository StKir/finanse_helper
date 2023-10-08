import { ISavedData } from '@/interfaces/store.interfaces';
import { getAllВepositsSelector } from '@/store/slices/SavedSlice';
import { useAppSelector } from '@/store/store';
import styles from '../MortgageItem/mortgageItem.module.scss';
import { moneyFormat } from '@/services/moneyFormat';
import TableSection from '../Table/Table';
import DepositExcelDownload from '@/components/smart/depositExcelDownload/DepositExcelDownload';
import { columnsDeposit } from '../Table/constants';
import TitleDescription from '@/components/ui/TitleDescription/TitleDescription';
import { Collapse } from 'antd';
import Error from '@/components/ui/error/Error';

const DepositItem = () => {
	const AllMortgage = useAppSelector(getAllВepositsSelector);
	const getItems = (array: ISavedData[]) => {
		if (array) {
			return array
				.map((el, i) => {
					if (el.type === 'deposit') {
						//Это что-то типа проверки на тип если type === 'deposit' значит приходит объект расчета вклада
						return {
							key: i,
							label: el.name,
							children: (
								<div>
									<div className={styles.initial_data}>
										<div>
											<span className={styles.initial_title}>
												Капитализация процентов:
											</span>
											<span>{el.initial.compoundInterest ? 'Да' : 'Нет'}</span>
										</div>
										<div>
											<span className={styles.initial_title}>
												Сумма вклада:
											</span>
											<span>
												{moneyFormat(el.initial.initialDepositAmount)}₽
											</span>
										</div>
										<div>
											<span className={styles.initial_title}>
												Процентная ставка:
											</span>
											<span>{el.initial.interestRate}%</span>
										</div>
										<div>
											<span className={styles.initial_title}>Срок вклада:</span>
											<span>{el.initial.investmentTermMonths} месяцев</span>
										</div>
										<div>
											<span className={styles.initial_title}>Дата начала:</span>
											<span>{el.initial.startDate}</span>
										</div>
										<DepositExcelDownload
											name={el.name}
											paymentData={el.data}
										/>
									</div>
									<TableSection
										paymentData={el.data}
										columns={columnsDeposit}
									/>
								</div>
							)
						};
					} else {
						return {
							key: i,
							label: 'Error',
							children: <Error />
						};
					}
				})
				.reverse();
		}
		return [];
	};
	const depositData = getItems(AllMortgage);

	return (
		<section>
			<TitleDescription>Расчеты вкладов</TitleDescription>
			{AllMortgage.length ? (
				<Collapse collapsible='header' items={depositData} />
			) : (
				'Вы еще не сохраняли расчеты'
			)}
		</section>
	);
}; //Компонент Ипотеки

export default DepositItem;
