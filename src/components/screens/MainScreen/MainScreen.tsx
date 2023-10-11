import styles from './mainScreen.module.scss';
import mainImg from '@/assets/img/gr.png';
import { useAuth } from '@/hooks/useAuth';
import { setModalStatus } from '@/store/slices/UserSlice';
import { useAppDispatch } from '@/store/store';
import { Button } from 'antd';
import Image from 'next/image';

const MainScreen = () => {
	const dispathc = useAppDispatch();
	const { isAuth } = useAuth();
	return (
		<section>
			<div className='container'>
				<div className={styles.main_wrp}>
					<h1>
						Оптимизируйте свои финансы и принимайте осознанные решения с помощью
						наших инструментов.
					</h1>
					<div className={styles.main_btn_group}>
						<Button
							href='/services'
							type='primary'
							className={styles.main_btn}
							size='large'
						>
							Начать
						</Button>
						{isAuth ? null : (
							<Button
								type='default'
								onClick={() => dispathc(setModalStatus(true))}
								className={styles.reg_btn}
								size='large'
							>
								Вход / Регистрация
							</Button>
						)}
					</div>
					<Image priority={true} src={mainImg} alt='Возможности' />
				</div>
			</div>
		</section>
	);
};

export default MainScreen;
