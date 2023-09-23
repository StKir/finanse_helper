import { Spin } from 'antd';

const Loader = () => {
	return (
		<div
			style={{
				width: '100%',
				height: 'auto',
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<Spin size='large' />
		</div>
	);
};

export default Loader;
