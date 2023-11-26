import React, { FC, useEffect } from 'react';
import styles from '../MortgageItem/mortgageItem.module.scss';
import { ISavedData2 } from '@/interfaces/store.interfaces';
import { moneyFormat } from '@/services/moneyFormat';
import DepositExcelDownload from '@/components/smart/depositExcelDownload/DepositExcelDownload';
import TableSection from '../Table/Table';
import useInvestmentCalculator from '@/hooks/useInvestmentCalculator';
import { columnsDeposit } from '../Table/constants';
import DepositProfitInfo from '../depositProfitInfo/DepostProfitInfo';

const DepositItemChildren: FC<ISavedData2> = (el) => {
	const {
		investmentData,
		calculateInvestment,
		investmentInput,
		investmentProfit
	} = useInvestmentCalculator();

	useEffect(() => {
		calculateInvestment({ ...el.initial });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [el.initial]);

	return (
		<div>
			<div className={styles.initial_data}>
				<div>
					<span className={styles.initial_title}>Капитализация процентов:</span>
					<span>{el.initial.compoundInterest ? 'Да' : 'Нет'}</span>
				</div>
				<div>
					<span className={styles.initial_title}>Сумма вклада:</span>
					<span>{moneyFormat(el.initial.initialDepositAmount)}₽</span>
				</div>
				<div>
					<span className={styles.initial_title}>Процентная ставка:</span>
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
				<DepositExcelDownload name={el.name} paymentData={investmentData} />
			</div>
			<TableSection paymentData={investmentData} columns={columnsDeposit} />
			<DepositProfitInfo
				profit={investmentProfit}
				initial={investmentInput?.initialDepositAmount || 0}
			/>
		</div>
	);
};

export default DepositItemChildren;
