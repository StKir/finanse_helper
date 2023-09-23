import NewService from '@/components/simple/NewService/NewService';
import Title from '@/components/ui/title/Title';
import styles from './mainScreen.module.scss';
import 'swiper/css';
import ValuteSection from '@/components/smart/mainValuteSection/ValuteSection';

const MainScreen = () => {
	return (
		<>
			<ValuteSection />
			<NewServiceSection />
			<div className='container'>
				<Title>Новости</Title>
			</div>
		</>
	);
};

const NewServiceSection = () => {
	return (
		<section>
			<div className='container'>
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
			</div>
		</section>
	);
};

export default MainScreen;
