import {
	IPropsDispathc,
	IRegistrationFormData
} from '@/interfaces/component.interface';
import {
	changeModalType,
	setModalStatus,
	setUser
} from '@/store/slices/UserSlice';
import {
	LockOutlined,
	MailOutlined,
	SmileOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile
} from 'firebase/auth';
import { FC } from 'react';

const RegistrationForm: FC<IPropsDispathc> = ({ dispathc }) => {
	const onFinish = async (value: IRegistrationFormData) => {
		const auth = getAuth();
		try {
			await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			).then(async ({ user }) => {
				const token = await user.getIdTokenResult();
				auth.currentUser &&
					(await updateProfile(auth.currentUser, {
						displayName: value.username
					}));
				dispathc(
					setUser({
						email: user.email || value.email,
						token: token.token,
						username: user.displayName!,
						id: user.uid,
						authLoadingStatus: 'success'
					})
				);
				dispathc(setModalStatus(false));
			});
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
				<Button type='link' onClick={() => dispathc(changeModalType('log'))}>
					Есть аккаунт?
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegistrationForm;
