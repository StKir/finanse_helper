import ServicesLayout from '@/components/layouts/ServicesLayout';
import TableSection from '@/components/simple/Table/Table';
import { columnsDeposit } from '@/components/simple/Table/constants';
import Title from '@/components/ui/title/Title';
import useInvestmentCalculator from '@/hooks/useInvestmentCalculator';
import { InvestmentParams } from '@/interfaces/component.interface';
import { Button, Checkbox, DatePicker, Form, InputNumber, Select } from 'antd';
import React, { FC } from 'react';

const Vklad: FC = () => {
	const [formDeposit] = Form.useForm();
	const { investmentData, calculateInvestment } = useInvestmentCalculator();

	const onSubmitForm = (value: InvestmentParams) => {
		const formattedDate = value.startDate.format('YYYY-MM-DD');
		calculateInvestment({
			...value,
			startDate: formattedDate
		});
	};
	const dateFormat = 'YYYY/MM/DD';

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
						defaultValue={1}
						options={[
							{ value: 1, label: 'Раз в месяц' },
							{ value: 3, label: 'Раз в квартал' },
							{ value: 6, label: 'Раз в полгода' },
							{ value: 12, label: 'Раз в год' }
						]}
					/>
				</Form.Item>
				<Button htmlType='submit' type='primary'>
					Расчитать
				</Button>
			</Form>
			<TableSection paymentData={investmentData} columns={columnsDeposit} />
		</ServicesLayout>
	);
};

export default Vklad;
