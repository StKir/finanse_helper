import { getAllValut, sortByValue } from '@/store/slices/ValuteSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import styles from './exchangerForm.module.scss';

type TValutInput = {
	type: 1 | 2;
	value: number;
};

//Стыдный компонент) делал в самый последний момент

const ExchangerForm = () => {
	const dispathc = useAppDispatch();
	const valutes = useAppSelector(sortByValue);
	const [valuteOne, SetValuteOne] = useState<number>(0);
	const [amountOne, SetAmountOne] = useState<TValutInput>({
		type: 1,
		value: 0
	});
	const [valuteTwo, SetValuteTwo] = useState<number>(0);
	const [amountTwo, SetAmountTwo] = useState<TValutInput>({
		type: 2,
		value: 0
	});

	useEffect(() => {
		dispathc(getAllValut());
	}, [dispathc]);

	useEffect(() => {
		getData(amountOne);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valuteOne, valuteTwo]);

	const getData = (arg: TValutInput) => {
		if (arg.type === 1) {
			SetAmountOne({ ...amountOne, value: Number(arg.value) });
			SetAmountTwo({
				...amountTwo,
				value: Number(((valuteOne / valuteTwo) * arg.value).toFixed(2)) || 0
			});
		}
		if (arg.type === 2) {
			SetAmountTwo({ ...amountTwo, value: Number(arg.value) });
			SetAmountOne({
				...amountOne,
				value: Number(((valuteTwo / valuteOne) * arg.value).toFixed(2)) || 0
			});
		}
	};

	const getValute = () => {
		const valuts = valutes.map((el) => ({
			value: el.Value / el.Nominal,
			label: el.Name
		}));
		return [{ value: 1, label: 'Российский рубль' }, ...valuts];
	};

	const valueSelect = getValute();

	return (
		<div className={styles.main_wrp}>
			<div className={styles.form_item}>
				<Select
					defaultValue={'Выберете валюту'}
					onChange={(e) => SetValuteOne(Number(e))}
					options={valueSelect}
				/>
				<InputNumber
					className={styles.number_input}
					min={0}
					value={amountOne.value}
					onChange={(e) => getData({ ...amountOne, value: Number(e) })}
				/>
			</div>
			<div className={styles.form_item}>
				<Select
					defaultValue={'Выберете валюту'}
					onChange={(e) => SetValuteTwo(Number(e))}
					options={valueSelect}
				/>
				<InputNumber
					className={styles.number_input}
					value={amountTwo.value}
					onChange={(e) => getData({ ...amountTwo, value: Number(e) })}
					min={0}
				/>
			</div>
		</div>
	);
};

export default ExchangerForm;
