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
import { FC } from 'react';

export const AuthorizationForm: FC<IPropsDispathc> = ({ dispathc }) => {
	const onFinish = (value: IAuthorizationFormData) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, value.email, value.password)
			.then(async (userCredential) => {
				if (value.remember) {
					localStorage.setItem('user', JSON.stringify(value));
				}
				const user = userCredential.user;
				// const token = await user.getIdTokenResult();
				// console.log(token);
				const token = getAuth().createCustomToken(uid);

				dispathc(
					setUser({
						email: user.email || value.email,
						token: user.email || value.email,
						id: user.uid,
						authLoadingStatus: 'success'
					})
				);
				dispathc(setModalStatus(false));
			})
			.catch((error) => {
				console.log(error);

				const errorCode = error.code;
				const errorMessage = error.message;
			});
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
