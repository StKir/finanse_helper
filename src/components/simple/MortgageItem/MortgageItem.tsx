import TitleDescription from '@/components/ui/TitleDescription/TitleDescription';
import { Collapse } from 'antd';
import { useAppSelector } from '@/store/store';
import { ISavedData } from '@/interfaces/store.interfaces';
import { getAllMortgageSelector } from '@/store/slices/SavedSlice';
import Error from '@/components/ui/error/Error';
import MortageChidrenItem from './mortageChildrenItem/MortageChidrenItem';

const MortgageItem = () => {
	const AllMortgage = useAppSelector(getAllMortgageSelector);

	const getItems = (array: ISavedData[]) => {
		if (array) {
			return array
				.map((el, i) => {
					if (el.type === 'mortage') {
						//Это что-то типа проверки на тип если type === 'mortage' значит приходит объект расчета ипотеки
						return {
							key: i,
							label: el.name,
							children: (
								<MortageChidrenItem
									type={'mortage'}
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
