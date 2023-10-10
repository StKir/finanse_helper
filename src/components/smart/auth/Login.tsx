import {
	IAuthorizationFormData,
	IPropsDispathc
} from '@/interfaces/component.interface';
import {
	changeModalType,
	setModalStatus,
	setUser
} from '@/store/slices/UserSlice';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FC, useState } from 'react';

const AuthorizationForm: FC<IPropsDispathc> = ({ dispathc }) => {
	const [errorMessage, setErrorMessage] = useState<string>('');

	const errorSwitch = (massage: string): void => {
		switch (massage) {
			case 'auth/invalid-login-credentials':
				setErrorMessage('Неверные логин или пароль');
				break;
			case 'auth/invalid-email':
				setErrorMessage('Неправильный Email');
				break;
			case 'auth/too-many-requests':
				setErrorMessage('Слишком много запросов, попробуйте позже!');
				break;
			default:
				setErrorMessage('Что-то пошло не так, попробуйте позже!');
				break;
		}
	};

	const onFinish = (value: IAuthorizationFormData) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, value.email, value.password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				const token = await user.getIdTokenResult();
				if (value.remember) {
					localStorage.setItem('user', token.token);
				}

				dispathc(
					setUser({
						email: user.email || value.email,
						token: token.token,
						username: user.displayName || 'user',
						id: user.uid,
						authLoadingStatus: 'success'
					})
				);
				dispathc(setModalStatus(false));
			})
			.then(() => setErrorMessage(''))
			.catch((err) => errorSwitch(err.code));
	};
	return (
		<Form
			name='login'
			layout='vertical'
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete='true'
		>
			<Form.Item
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Пожалуйста введите Email' }]}
			>
				<Input prefix={<MailOutlined className='site-form-item-icon' />} />
			</Form.Item>

			<Form.Item
				label='Пароль'
				name='password'
				rules={[
					{ required: true, message: 'Введите пароль' },
					{ min: 6, message: 'Пароль должен содержать минимум 6 символов' }
				]}
			>
				<Input.Password
					prefix={<LockOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>

			<Form.Item name='remember' valuePropName='checked'>
				<Checkbox>Запомнить меня</Checkbox>
			</Form.Item>
			{errorMessage ? (
				<Form.Item>
					<span
						style={{
							marginBottom: 20,
							color: 'red',
							fontSize: 18
						}}
					>
						{errorMessage}
					</span>
				</Form.Item>
			) : null}
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Войти
				</Button>
				<Button type='link' onClick={() => dispathc(changeModalType('reg'))}>
					Регистрация
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AuthorizationForm;
