import { ITable } from '@/interfaces/component.interface';
import { Table } from 'antd';
import { FC } from 'react';

const TableSection: FC<ITable> = ({ paymentData, columns }) => {
	const newData = paymentData.map((el, i) => {
		return { ...el, key: i + 1 };
	});

	return (
		<Table
			scroll={{ x: 1000, y: 400 }}
			dataSource={newData}
			columns={columns}
		/>
	);
};

export default TableSection;
