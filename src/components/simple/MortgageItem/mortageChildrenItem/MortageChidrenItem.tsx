import { MortgageInput } from '@/interfaces/mortgage.interface';
import { FC, useEffect } from 'react';
import TableSection from '../../Table/Table';
import PaymentDataExcelExporter from '@/components/smart/mortgageExcelDownload/PaymentDataExcelExporter';
import { ISavedData1 } from '@/interfaces/store.interfaces';
import { moneyFormat } from '@/services/moneyFormat';
import { columns } from '../../Table/constants';
import styles from '../mortgageItem.module.scss';
import useMortgageCalculator from '@/hooks/useMortgageCalculator';
import OverPriceTable from '@/components/smart/overpriceTable/OverPriceTable';

type TChildrenProps = Omit<ISavedData1, 'data'>;

const MortageChidrenItem: FC<TChildrenProps> = (el) => {
	const { mortgageData, calculateMortgage, mortgageInput, overpayment } =
		useMortgageCalculator();

	useEffect(() => {
		calculateMortgage(el.initial);
	}, [calculateMortgage, el.initial]);

	return (
		<div>
			<div className={styles.initial_data}>
				<div>
					<span className={styles.initial_title}>Тип платежей:</span>
					<span>{el.initial.paymentType}</span>
				</div>
				<div>
					<span className={styles.initial_title}>Стоимость недвижимости:</span>
					<span>{moneyFormat(el.initial.propertyPrice)}₽</span>
				</div>
				<div>
					<span className={styles.initial_title}>Первоначальный взнос:</span>
					<span>{moneyFormat(el.initial.downPayment)}₽</span>
				</div>
				<div>
					<span className={styles.initial_title}>Срок кредита:</span>
					<span>{el.initial.loanTermMonths} месяцев</span>
				</div>
				<div>
					<span className={styles.initial_title}>Процентная ставка:</span>
					<span>{el.initial.interestRate}%</span>
				</div>
				<PaymentDataExcelExporter name={el.name} paymentData={mortgageData} />
			</div>
			<TableSection paymentData={mortgageData} columns={columns} />
			<OverPriceTable
				initialValue={
					mortgageInput
						? mortgageInput.propertyPrice - mortgageInput.downPayment
						: 0
				}
				overprice={overpayment}
			/>
		</div>
	);
};

export default MortageChidrenItem;
