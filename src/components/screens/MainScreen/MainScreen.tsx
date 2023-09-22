import NewService from '@/components/simple/NewService/NewService';
import Title from '@/components/ui/title/Title';
import styles from './mainScreen.module.scss';
import ValuteCard from '@/components/simple/ValuteCard/ValuteCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const MainScreen = () => {
	return (
		<>
			<div className='container'>
				<NewServiceSection />
			</div>
			<ValuteSection />
			<div className='container'>
				<Title>Новости</Title>
			</div>
		</>
	);
};

const NewServiceSection = () => {
	return (
		<section>
			<Title>Новинки</Title>
			<div className={styles.main_wrp}>
				<NewService
					title={'Калькулятор ипотеки'}
					description={'Подсчитай сколько стоит жилищный вопрос'}
					link={'/'}
				/>
				<NewService
					title={'Калькулятор ипотеки'}
					description={'Подсчитай сколько стоит жилищный вопрос'}
					link={'/'}
				/>
			</div>
		</section>
	);
};

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ValuteSection = () => {
	return (
		<section className={styles.slider_section}>
			<div className='container'>
				<Title>Валюты</Title>
			</div>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={20}
				grabCursor={true}
				className='mySwiper'
			>
				{array.map((el, i) => {
					return (
						<SwiperSlide
							key={i}
							className={i === 0 ? styles.first_slider : styles.swiper_slider}
						>
							<ValuteCard />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
};
export default MainScreen;
