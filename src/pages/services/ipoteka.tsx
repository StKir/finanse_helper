import ServicesLayout from '@/components/layouts/ServicesLayout';
import TableSection from '@/components/simple/Table/Table';
import { columns } from '@/components/simple/Table/constants';
import PaymentDataExcelExporter from '@/components/smart/mortgageExcelDownload/PaymentDataExcelExporter';
import OverPriceTable from '@/components/smart/overpriceTable/OverPriceTable';
import Title from '@/components/ui/title/Title';
import { useAuth } from '@/hooks/useAuth';
import useMortgageCalculator from '@/hooks/useMortgageCalculator';
import { IMessageProps } from '@/interfaces/component.interface';
import { MortgageData, MortgageInput } from '@/interfaces/mortgage.interface';
import { resetLoadingStatus, setSavedData } from '@/store/slices/SavedSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Form, Input, InputNumber, Radio, message } from 'antd';
import { useEffect, useState } from 'react';

const IpotekaService = () => {
	const [form] = Form.useForm();
	const [mortageName, SetMortageName] = useState<string>('');
	const [messageApi, contextHolder] = message.useMessage();
	const dispathc = useAppDispatch();
	const { isAuth, id } = useAuth();
	const savedLoadingStatus = useAppSelector(
		(state) => state.saved.loadingStatus
	);

	const { mortgageData, calculateMortgage, mortgageInput, overpayment } =
		useMortgageCalculator();

	const messageForStatusSave = ({ type, content }: IMessageProps) => {
		messageApi.open({
			type: type,
			content: content
		});
	};

	useEffect(() => {
		return () => {
			dispathc(resetLoadingStatus());
		};
	});

	useEffect(() => {
		switch (savedLoadingStatus) {
			case 'loading':
				messageForStatusSave({
					type: 'loading',
					content: 'Сохранение'
				});
				break;
			case 'error':
				messageForStatusSave({
					type: 'error',
					content: 'Ошибка сохранения'
				});
				break;
			case 'success':
				messageForStatusSave({
					type: 'success',
					content: 'Сохранено'
				});
				SetMortageName('');
				break;
			default:
				return;
		}
		// eslint-disable-next-line
	}, [savedLoadingStatus]);

	const onResetCalculator = () => {
		form.resetFields();
		calculateMortgage({
			downPayment: 0,
			propertyPrice: 0,
			loanTermMonths: 0,
			interestRate: 0,
			paymentType: 'Аннуитетные'
		});
		SetMortageName('');
	};

	const onSave = () => {
		dispathc(
			setSavedData({
				id,
				type: 'mortage',
				name: mortageName,
				initial: mortgageInput!
			})
		);
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
			{contextHolder}
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
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						placeholder='Введите стоимость недвижимости'
						formatter={(value) =>
							`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>
				<Form.Item
					label='Первоначальный взнос'
					name='downPayment'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						placeholder='Первоначальный взнос'
						formatter={(value) =>
							`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
					/>
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
					<PaymentDataExcelExporter paymentData={mortgageData} />
				</div>
			</Form>
			<div
				style={{
					display: 'flex',
					marginTop: 20
				}}
			>
				<Button
					disabled={!(isAuth && !!mortgageData.length && !!mortageName)}
					type='primary'
					onClick={onSave}
				>
					Сохранить расчет
				</Button>
				<Input
					type='string'
					value={mortageName}
					onChange={(e) => SetMortageName(e.target.value)}
					placeholder='Введите название расчета'
				/>
			</div>
			<TableSection paymentData={mortgageData} columns={columns} />
			<OverPriceTable
				initialValue={
					mortgageInput
						? mortgageInput.propertyPrice - mortgageInput.downPayment
						: 0
				}
				overprice={overpayment}
			/>
		</ServicesLayout>
	);
};

export default IpotekaService;
