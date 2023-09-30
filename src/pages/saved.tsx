import ServicesLayout from '@/components/layouts/ServicesLayout';
import Loader from '@/components/ui/loader/Loader';
import Error from '@/components/ui/error/Error';
import Title from '@/components/ui/title/Title';
import { useAuth } from '@/hooks/useAuth';
import {
	getAllMortgageSelector,
	getAllВepositsSelector,
	getSavedData
} from '@/store/slices/SavedSlice';
import { changeModalType, setModalStatus } from '@/store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Collapse, Result } from 'antd';
import { useEffect } from 'react';
import TableSection from '@/components/simple/Table/Table';
import { columns } from '@/components/simple/Table/constants';
import TitleDescription from '@/components/ui/TitleDescription/TitleDescription';
import { ISavedData } from '@/interfaces/store.interfaces';

const Saved = () => {
	const { isAuth } = useAuth();
	return (
		<ServicesLayout>{isAuth ? <SavedPage /> : <NotAuth />}</ServicesLayout>
	);
};

const SavedPage = () => {
	const dispathc = useAppDispatch();
	const id = useAppSelector((state) => state.user.id);
	const savedСalculations = useAppSelector((state) => state.saved.data);
	const AllMortgage = useAppSelector(getAllMortgageSelector);
	const AllВeposits = useAppSelector(getAllВepositsSelector);
	const savedСalculationsLoadingStatus = useAppSelector(
		(state) => state.saved.loadingStatus
	);

	useEffect(() => {
		dispathc(getSavedData(id));
	}, [dispathc, id]);

	if (savedСalculationsLoadingStatus === 'loading') return <Loader />;
	if (savedСalculationsLoadingStatus === 'error') return <Error />;

	const getItems = (array: ISavedData[]) => {
		if (array) {
			return array
				.map((el, i) => {
					return {
						key: i,
						label: el.name,
						children: <TableSection paymentData={el.data} columns={columns} />
					};
				})
				.reverse();
		}
		return [];
	};

	const itemsMortgage = getItems(AllMortgage);
	const itemsDeposit = getItems(AllВeposits);

	return (
		<>
			<Title>Сохраненные расчеты</Title>
			<section>
				<TitleDescription>Расчеты ипотеки</TitleDescription>
				<Collapse collapsible='header' items={itemsMortgage} />
			</section>
			<section>
				<TitleDescription>Расчеты вкладов</TitleDescription>
				<Collapse collapsible='header' items={itemsDeposit} />
			</section>
			<section>
				<TitleDescription>Расчеты стоимости рабочего времени</TitleDescription>
				<Collapse collapsible='header' items={itemsDeposit} />
			</section>
		</>
	);
};

const NotAuth = () => {
	const dispathc = useAppDispatch();
	const onReg = () => {
		dispathc(setModalStatus(true));
		dispathc(changeModalType('reg'));
	};
	return (
		<Result
			status='403'
			title='403'
			subTitle='Похоже что вы не зарегистрированы'
			extra={
				<Button onClick={onReg} type='primary'>
					Регистрация
				</Button>
			}
		/>
	);
};

// const MortgageItem = () => {
// 	return(
// 		<div>
// 			<div className='intital'>{

// 			}</div>
// 			<TableSection paymentData={el.data} columns={columns} />
// 		</div>
// 	)
// } //Компонент Ипотеки

export default Saved;
