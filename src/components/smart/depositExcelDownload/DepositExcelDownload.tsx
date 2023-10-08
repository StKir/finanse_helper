import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { DownloadOutlined } from '@ant-design/icons';
import { DepostDataExcekExporterProps } from '@/interfaces/component.interface';
import { Button } from 'antd';

const DepositExcelDownload: React.FC<DepostDataExcekExporterProps> = ({
	paymentData,
	name = 'deposit_data.xlsx'
}) => {
	const exportToExcel = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Payment Data');

		worksheet.columns = [
			{ header: 'Дата', key: 'data', width: 10 },
			{ header: 'Начислено процентов', key: 'rate', width: 20 },
			{
				header: 'Изменение баланса',
				key: 'balanceChange',
				width: 20
			},
			{ header: 'Баланс', key: 'balance', width: 20 }
		];

		paymentData.forEach((payment) => {
			worksheet.addRow({
				data: payment['Дата'],
				rate: payment['Начислено процентов'],
				balanceChange: payment['Изменение баланса'],
				balance: payment['Баланс']
			});
		});

		workbook.xlsx.writeBuffer().then((buffer) => {
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			saveAs(blob, name);
		});
	};
	return (
		<Button
			type={'dashed'}
			disabled={!(paymentData.length > 1)}
			onClick={exportToExcel}
			icon={<DownloadOutlined />}
		>
			Скачать данные в Excel
		</Button>
	);
};

export default DepositExcelDownload;
