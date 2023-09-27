import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { PaymentDataExcelExporterProps } from '@/interfaces/mortgage.interface';

const PaymentDataExcelExporter: React.FC<PaymentDataExcelExporterProps> = ({
	paymentData
}) => {
	const exportToExcel = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Payment Data');

		worksheet.columns = [
			{ header: 'Месяц', key: 'month', width: 10 },
			{ header: 'Сумма платежа', key: 'paymentAmount', width: 20 },
			{
				header: 'Платеж по основному долгу',
				key: 'principalPayment',
				width: 20
			},
			{ header: 'Платеж по процентам, ₽', key: 'interestPayment', width: 20 },
			{ header: 'Остаток долга', key: 'remainingLoan', width: 20 }
		];

		paymentData.forEach((payment) => {
			worksheet.addRow({
				month: payment['Месяц'],
				paymentAmount: payment['Сумма платежа'],
				principalPayment: payment['Платеж по основному долгу'],
				interestPayment: payment['Платеж по процентам'],
				remainingLoan: payment['Остаток долга']
			});
		});

		workbook.xlsx.writeBuffer().then((buffer) => {
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			saveAs(blob, 'payment_data.xlsx');
		});
	};
	return (
		<Button
			type={'dashed'}
			disabled={!(paymentData.length > 1)}
			onClick={exportToExcel}
		>
			Скачать данные об оплате в Excel
		</Button>
	);
};

export default PaymentDataExcelExporter;
