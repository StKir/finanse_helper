import ServicesLayout from '@/components/layouts/ServicesLayout';
import TableSection from '@/components/simple/Table/Table';
import PaymentDataExcelExporter from '@/components/smart/mortgageExcelDownload/PaymentDataExcelExporter';
import Title from '@/components/ui/title/Title';
import { useAuth } from '@/hooks/useAuth';
import useMortgageCalculator from '@/hooks/useMortgageCalculator';
import { TColums } from '@/interfaces/component.interface';
import { MortgageInput } from '@/interfaces/mortgage.interface';
import { setSavedData } from '@/store/slices/SavedSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Form, Input, Radio } from 'antd';

const IpotekaService = () => {
	const [form] = Form.useForm();
	const dispathc = useAppDispatch();
	const { isAuth, id } = useAuth();
	const savedLoadingStatus = useAppSelector(
		(state) => state.saved.loadingStatus
	);

	const { mortgageData, calculateMortgage } = useMortgageCalculator();

	const onResetCalculator = () => {
		form.resetFields();
		calculateMortgage({
			downPayment: 0,
			propertyPrice: 0,
			loanTermMonths: 0,
			interestRate: 0,
			paymentType: 'Аннуитетные'
		});
	};

	const onSubmitForm = (value: MortgageInput): void => {
		calculateMortgage({
			downPayment: Number(value.downPayment),
			propertyPrice: Number(value.propertyPrice),
			loanTermMonths: Number(value.loanTermMonths),
			interestRate: Number(value.interestRate),
			paymentType: value.paymentType
		});
	};

	return (
		<ServicesLayout>
			<Title>Расчет ипотеки</Title>
			<Form
				form={form}
				initialValues={{ paymentType: 'Аннуитетные' }}
				onFinish={onSubmitForm}
				layout='vertical'
				size='large'
			>
				<Form.Item
					label='Тип платежей'
					name='paymentType'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<Radio.Group>
						<Radio.Button value='Аннуитетные'>Аннуитетные</Radio.Button>
						<Radio.Button value='Дифференцированные'>
							Дифференцированные
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='Стоимость недвижимости'
					name='propertyPrice'
					rules={[
						{ required: true, message: 'Обязательно для заполнения' },
						{ min: 6, message: 'Минимум 100.000' }
					]}
				>
					<Input type='number' placeholder='Введите стоимость недвижимости' />
				</Form.Item>
				<Form.Item
					label='Первоначальный взнос'
					name='downPayment'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<Input placeholder={'Первоначальный взнос'} />
				</Form.Item>

				<Form.Item
					label='Срок кредита в месяцах'
					name='loanTermMonths'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<Input type='number' placeholder='Введите cрок кредита' />
				</Form.Item>
				<Form.Item
					label='Процентная ставка'
					name='interestRate'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<Input type='number' placeholder='Введите ставку' />
				</Form.Item>
				<div className='btn_group'>
					<Button htmlType='submit' type='primary'>
						Расчитать
					</Button>
					<Button type='dashed' onClick={onResetCalculator}>
						Новый расчет
					</Button>
					<Button
						disabled={!(isAuth && !!mortgageData.length)}
						type='default'
						onClick={() =>
							dispathc(
								setSavedData({
									id,
									type: 'mortage',
									data: mortgageData
								})
							)
						}
					>
						Сохранить расчет в профиль
					</Button>
					<PaymentDataExcelExporter paymentData={mortgageData} />
				</div>
			</Form>
			<TableSection paymentData={mortgageData} columns={columns} />
		</ServicesLayout>
	);
};

const columns: TColums[] = [
	{
		title: 'Месяц',
		dataIndex: 'Месяц',
		key: 'Месяц'
	},
	{
		title: 'Сумма платежа',
		dataIndex: 'Сумма платежа',
		key: 'Сумма платежа'
	},
	{
		title: 'Платеж по основному долгу',
		dataIndex: 'Платеж по основному долгу',
		key: 'Платеж по основному долгу'
	},
	{
		title: 'Платеж по процентам',
		dataIndex: 'Платеж по процентам',
		key: 'Платеж по процентам'
	},
	{
		title: 'Остаток долга',
		dataIndex: 'Остаток долга',
		key: 'Остаток долга'
	}
];

export default IpotekaService;
