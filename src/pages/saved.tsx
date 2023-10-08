import ServicesLayout from '@/components/layouts/ServicesLayout';
import Loader from '@/components/ui/loader/Loader';
import Error from '@/components/ui/error/Error';
import Title from '@/components/ui/title/Title';
import { useAuth } from '@/hooks/useAuth';
import { getSavedData } from '@/store/slices/SavedSlice';
import { changeModalType, setModalStatus } from '@/store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Result } from 'antd';
import { useEffect } from 'react';
import MortgageItem from '@/components/simple/MortgageItem/MortgageItem';
import DepositItem from '@/components/simple/DepositItem/DepositItem';

const Saved = () => {
	const { isAuth } = useAuth();
	return (
		<ServicesLayout>{isAuth ? <SavedPage /> : <NotAuth />}</ServicesLayout>
	);
};

const SavedPage = () => {
	const dispathc = useAppDispatch();
	const id = useAppSelector((state) => state.user.id);
	const savedСalculationsLoadingStatus = useAppSelector(
		(state) => state.saved.loadingStatus
	);

	useEffect(() => {
		dispathc(getSavedData(id));
	}, [dispathc, id]);

	if (savedСalculationsLoadingStatus === 'loading') return <Loader />;
	if (savedСalculationsLoadingStatus === 'error') return <Error />;

	return (
		<>
			<Title>Сохраненные расчеты</Title>
			<MortgageItem />
			<DepositItem />
			{/* <section>
				<TitleDescription>Расчеты вкладов</TitleDescription>
				<Collapse collapsible='header' items={itemsDeposit} />
			</section>
			<section>
				<TitleDescription>Расчеты стоимости рабочего времени</TitleDescription>
				<Collapse collapsible='header' items={itemsDeposit} />
			</section> */}
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

export default Saved;
