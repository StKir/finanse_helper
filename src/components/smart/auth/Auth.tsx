import { Button, Checkbox, Form, Input, Modal } from 'antd';
import styles from './auth.module.scss';
import { FC, useState } from 'react';
import Title from '@/components/ui/title/Title';
import {
	LockOutlined,
	MailOutlined,
	SmileOutlined,
	UserOutlined
} from '@ant-design/icons';
import {
	IAuthProps,
	IAuthType,
	IAuthorizationFormData,
	IRegistrationFormData,
	TModalType
} from '@/interfaces/component.interface';

const Auth: FC<IAuthProps> = ({ isOpen, setOpen }) => {
	const [authType, setAuthType] = useState<TModalType>('log');
	return (
		<Modal
			// title={authType === 'log' ? 'Авторизация' : 'Регистрация'}
			open={isOpen}
			onCancel={() => setOpen(false)}
			footer={''}
		>
			<Title>{authType === 'log' ? 'Авторизация' : 'Регистрация'}</Title>
			{authType === 'log' ? (
				<AuthorizationForm setAuthType={setAuthType} />
			) : (
				<RegistrationForm setAuthType={setAuthType} />
			)}
		</Modal>
	);
};

const AuthorizationForm: FC<IAuthType> = ({ setAuthType }) => {
	const onFinish = (value: IAuthorizationFormData) => {
		console.log(value);
		//Логика firebase
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
				label='Логин'
				name='username'
				rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
			>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} />
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

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Войти
				</Button>
				<Button type='link' onClick={() => setAuthType('reg')}>
					Регистрация
				</Button>
			</Form.Item>
		</Form>
	);
};
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/slices/UserSlice';

const RegistrationForm: FC<IAuthType> = ({ setAuthType }) => {
	const dispatch = useAppDispatch();
	const onFinish = async (value: IRegistrationFormData) => {
		const auth = getAuth();
		const token = '';

		try {
			await createUserWithEmailAndPassword(auth, value.email, value.password)
				.then(({ user }) => {
					const token = user.getIdToken;
					dispatch(
						setUser({
							email: user.email || value.email,
							token: token,
							id: user.uid
						})
					);
				})
				.catch(console.error);
			auth.currentUser &&
				(await updateProfile(auth.currentUser, {
					displayName: value.username
				}).catch(console.error));
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Form
			name='registration'
			layout='vertical'
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete='true'
		>
			<Form.Item
				label='Логин'
				name='username'
				rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
			>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} />
			</Form.Item>
			<Form.Item
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Пожалуйста введите Email' }]}
			>
				<Input prefix={<MailOutlined className='site-form-item-icon' />} />
			</Form.Item>
			<Form.Item
				label='Имя'
				name='name'
				rules={[{ required: true, message: 'Пожалуйста введите Имя' }]}
			>
				<Input prefix={<SmileOutlined className='site-form-item-icon' />} />
			</Form.Item>
			<Form.Item
				label='Пароль'
				name='password'
				hasFeedback
				rules={[
					{ required: true, message: 'Введите пароль' },
					{ min: 6, message: 'Пароль должен содержать минимум 6 символов' }
				]}
			>
				<Input.Password
					prefix={<LockOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>
			<Form.Item
				name='confirm'
				label='Повторите пароль'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Пожалуйста подтвердите свой пароль'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('Пароли не совпадают'));
						}
					})
				]}
			>
				<Input.Password
					prefix={<LockOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Зарегистрироваться
				</Button>
				<Button type='link' onClick={() => setAuthType('log')}>
					Есть аккаунт?
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Auth;
