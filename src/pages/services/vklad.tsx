import ServicesLayout from '@/components/layouts/ServicesLayout';
import TableSection from '@/components/simple/Table/Table';
import { columnsDeposit } from '@/components/simple/Table/constants';
import DepositProfitInfo from '@/components/simple/depositProfitInfo/DepostProfitInfo';
import DepositExcelDownload from '@/components/smart/depositExcelDownload/DepositExcelDownload';
import Title from '@/components/ui/title/Title';
import { useAuth } from '@/hooks/useAuth';
import useInvestmentCalculator from '@/hooks/useInvestmentCalculator';
import { InvestmentParams } from '@/interfaces/deposit.inteface';
import { setSavedData } from '@/store/slices/SavedSlice';
import { useAppDispatch } from '@/store/store';
import {
	Button,
	Checkbox,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Select
} from 'antd';
import React, { FC, useState } from 'react';

const Vklad: FC = () => {
	const [formDeposit] = Form.useForm();
	const [depositName, setDepositName] = useState<string>('');
	const { isAuth, id } = useAuth();
	const dispathc = useAppDispatch();
	const {
		investmentData,
		calculateInvestment,
		investmentInput,
		investmentProfit
	} = useInvestmentCalculator();

	const onSubmitForm = (value: InvestmentParams) => {
		const formattedDate = value.startDate.format('YYYY-MM-DD');
		calculateInvestment({
			...value,
			startDate: formattedDate
		});
	};

	const onResetCalculator = () => {
		formDeposit.resetFields();
		setDepositName('');
		calculateInvestment({
			initialDepositAmount: 0,
			investmentTermMonths: 0,
			interestRate: 0,
			paymentFrequency: 0,
			compoundInterest: false,
			startDate: 0
		});
	};

	const dateFormat = 'YYYY/MM/DD';

	const onSave = () => {
		dispathc(
			setSavedData({
				id,
				type: 'deposit',
				name: depositName,
				initial: investmentInput!
			})
		);
	};

	return (
		<ServicesLayout>
			<Title>Расчет вклада</Title>
			<Form
				form={formDeposit}
				onFinish={onSubmitForm}
				layout='vertical'
				size='large'
			>
				<Form.Item
					label='Сумма вклада'
					name='initialDepositAmount'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						formatter={(value) =>
							`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						min={1}
					/>
				</Form.Item>
				<Form.Item
					label='Срок размещения в месяцах'
					name='investmentTermMonths'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<InputNumber min={1} />
				</Form.Item>
				<Form.Item
					label='Начало срока'
					name='startDate'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<DatePicker format={dateFormat} />
				</Form.Item>
				<Form.Item
					label='Процентная ставка'
					name='interestRate'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<InputNumber min={1} />
				</Form.Item>
				<Form.Item name='compoundInterest' valuePropName='checked'>
					<Checkbox>Капитализация процентов</Checkbox>
				</Form.Item>
				<Form.Item
					label='Периодичность выплат процентов'
					name='paymentFrequency'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
				>
					<Select
						options={[
							{ value: 1, label: 'Раз в месяц' },
							{ value: 3, label: 'Раз в квартал' },
							{ value: 6, label: 'Раз в полгода' },
							{ value: 12, label: 'Раз в год' }
						]}
					/>
				</Form.Item>
				<div className='btn_group'>
					<Button htmlType='submit' type='primary'>
						Расчитать
					</Button>
					<Button type='dashed' onClick={onResetCalculator}>
						Новый расчет
					</Button>
					<DepositExcelDownload paymentData={investmentData} />
				</div>
			</Form>
			<div
				style={{
					display: 'flex',
					marginTop: 20
				}}
			>
				<Button
					disabled={!(isAuth && !!investmentData.length && !!depositName)}
					type='primary'
					onClick={onSave}
				>
					Сохранить расчет
				</Button>
				<Input
					type='string'
					value={depositName}
					onChange={(e) => setDepositName(e.target.value)}
					placeholder='Введите название вклада'
				/>
			</div>
			<TableSection paymentData={investmentData} columns={columnsDeposit} />
			<DepositProfitInfo
				profit={investmentProfit}
				initial={investmentInput?.initialDepositAmount || 0}
			/>
		</ServicesLayout>
	);
};

export default Vklad;
