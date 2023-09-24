import { ITable } from '@/interfaces/component.interface';
import { Table } from 'antd';
import { FC } from 'react';

const TableSection: FC<ITable> = ({ paymentData, columns }) => {
	const newData = paymentData.map((el, i) => {
		return { ...el, key: i + 1 };
	});

	return <Table dataSource={newData} columns={columns} />;
};

export default TableSection;
