import NewService from '@/components/simple/NewService/NewService';
import Title from '@/components/ui/title/Title';
import styles from './ServicesScreen.module.scss';
import 'swiper/css';
import ValuteSection from '@/components/smart/mainValuteSection/ValuteSection';
import NewsSection from '@/components/smart/newsSection/NewsSection';

const ServicesScreen = () => {
	return (
		<>
			<ValuteSection />
			<NewServiceSection />
			<NewsSection />
		</>
	);
};

const NewServiceSection = () => {
	return (
		<section>
			<div className='container'>
				<Title>Сервисы</Title>
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

export default ServicesScreen;
