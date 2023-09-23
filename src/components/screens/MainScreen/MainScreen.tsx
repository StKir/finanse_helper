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
				<Title desc='из мира финансов'>Новости</Title>
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
						link={'/services/ipoteka'}
					/>
					<NewService
						title={'Калькулятор вкладов'}
						description={
							'Узнай сколько заработаешь если вложишь деньги под процент'
						}
						link={'/services/vklad'}
					/>
					<NewService
						title={'Конвертер валют'}
						description={'Переведи'}
						link={'/services/convector'}
					/>
					<NewService
						title={'Обменник криптовалюты'}
						description={
							'Обменник с низкой коммисией от разработчика приложения'
						}
						link={'https://finance-5f1fd85y5-stkir.vercel.app'}
					/>
				</div>
			</div>
		</section>
	);
};

export default MainScreen;
