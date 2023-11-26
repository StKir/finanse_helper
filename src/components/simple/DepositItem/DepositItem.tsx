import { ISavedData } from '@/interfaces/store.interfaces';
import { getAllВepositsSelector } from '@/store/slices/SavedSlice';
import { useAppSelector } from '@/store/store';
import TitleDescription from '@/components/ui/TitleDescription/TitleDescription';
import { Collapse } from 'antd';
import Error from '@/components/ui/error/Error';
import DepositItemChildren from './DepositItemChildren';

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
								<DepositItemChildren
									type={el.type}
									name={el.name}
									initial={el.initial}
								/>
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
