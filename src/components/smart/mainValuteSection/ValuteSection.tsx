import { getAllValut, sortByValue } from '@/store/slices/ValuteSlice';
import styles from './valuteSection.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Title from '@/components/ui/title/Title';
import ValuteCard from '@/components/simple/ValuteCard/ValuteCard';
import { Form, InputNumber, Popover, Select } from 'antd';
import { Input } from 'antd';
import Loader from '@/components/ui/loader/Loader';
import Error from '@/components/ui/error/Error';
import { TValuteRes } from '@/interfaces/store.interfaces';

const ValuteSection: FC = () => {
	return (
		<section className={styles.slider_section}>
			<div className='container'>
				<Title desc='/ Кликните на карточку чтобы увидеть описание'>
					Валюты
				</Title>
			</div>
			<ValuteSlider />
			{/* <ValuteExchanger /> */}
		</section>
	);
};

const ValuteSlider = () => {
	const [name, SetName] = useState<string>('');
	const dispath = useAppDispatch();
	const valutes = useAppSelector(sortByValue);
	const loading = useAppSelector((state) => state.valute.LoadingStatus);

	useEffect(() => {
		dispath(getAllValut());
	}, [dispath]);

	if (loading === 'loading' || loading === 'idle') {
		return <Loader />;
	}
	if (loading === 'error') {
		return <Error />;
	}

	const getValute = (name: string) => {
		if (!name || name === '') return valutes;
		return valutes.filter((el) => {
			return (
				el.CharCode.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
				el.Name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
			);
		});
	};

	const valut = getValute(name);
	return (
		<Swiper slidesPerView={'auto'} spaceBetween={20} className='mySwiper'>
			<SwiperSlide className={styles.first_slider}>
				<div className={styles.swiper_slider}>
					<h3>Поиск валюты</h3>
					<Input
						placeholder='Например: usd или доллар'
						value={name}
						onChange={(e) => SetName(e.target.value)}
					/>
				</div>
			</SwiperSlide>
			{!valut.length && (
				<SwiperSlide>
					<div>
						<h3>Такого нет</h3>
					</div>
				</SwiperSlide>
			)}
			{valut.map((el) => {
				return (
					<SwiperSlide key={el.ID} className={styles.swiper_slider}>
						<Popover trigger='click' placement='bottom' title={el.Name}>
							<div>
								<ValuteCard
									Previous={el.Previous}
									CharCode={el.CharCode}
									Nominal={el.Nominal}
									Value={el.Value}
								/>
							</div>
						</Popover>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

// type TValuteInfo = {
// 	name: string;
// 	value: number;
// };

// const initialObj = {
// 	name: 'Выберете валюту',
// 	value: 0
// };

// const ValuteExchanger = () => {
// 	const valutes = useAppSelector(sortByValue);
// 	const loading = useAppSelector((state) => state.valute.LoadingStatus);

// 	const handleChange = (arg: number | TValuteRes) => {
// 		// if (typeof arg === 'number') {
// 		// 	SetValuteOne({
// 		// 		valut: valuteOne?.valut
// 		// 	});
// 		// }
// 	};

// 	const getValute = () => {
// 		const valuts = valutes.map((el) => ({
// 			value: el.Value / el.Nominal,
// 			label: el.Name
// 		}));
// 		return [{ value: 1, label: 'Российский рубль' }, ...valuts];
// 	};
// 	const valueSelect = getValute();

// 	return (
// 		<div className={styles.exchanger_wrp}>
// 			<Form >
// 				<div className={styles.exhanger_from}>
// 					<Select
// 						defaultValue={5}
// 						onChange={handleChange}
// 						options={valueSelect}
// 					/>
// 					<InputNumber
// 						formatter={(value) =>
// 							`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// 						}
// 					/>
// 				</div>
// 				<div className={styles.exhanger_from}>
// 					<Select
// 						defaultValue={1}
// 						onChange={handleChange}
// 						options={valueSelect}
// 					/>
// 					<InputNumber
// 						formatter={(value) =>
// 							`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// 						}
// 					/>
// 				</div>
// 			</Form>
// 		</div>
// 	);
// };

export default ValuteSection;
