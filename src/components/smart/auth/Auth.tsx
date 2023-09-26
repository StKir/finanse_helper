import { Modal } from 'antd';
import { FC } from 'react';
import Title from '@/components/ui/title/Title';
import { IAuthProps } from '@/interfaces/component.interface';

import RegistrationForm from './Registration';
import AuthorizationForm from './Login';
import { setModalStatus } from '@/store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const Auth: FC<IAuthProps> = ({ isOpen }) => {
	const authType = useAppSelector((state) => state.user.authModalType);
	const dispathc = useAppDispatch();
	return (
		<Modal
			open={isOpen}
			onCancel={() => dispathc(setModalStatus(false))}
			footer={''}
		>
			<Title>{authType === 'log' ? 'Авторизация' : 'Регистрация'}</Title>
			{authType === 'log' ? (
				<AuthorizationForm dispathc={dispathc} />
			) : (
				<RegistrationForm dispathc={dispathc} />
			)}
		</Modal>
	);
};

export default Auth;
