import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';

const GoBackBtn: FC = () => {
	const router = useRouter();
	return (
		<Button
			style={{ marginBottom: 20 }}
			onClick={() => router.back()}
			type='default'
			size='large'
		>
			<LeftOutlined />
			Назад
		</Button>
	);
};

export default GoBackBtn;
