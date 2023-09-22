import { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {
	return (
		<h2
			style={{
				color: '#4F4F4F',
				fontSize: 32,
				fontStyle: 'normal',
				fontWeight: 500,
				lineHeight: '110%',
				marginBottom: 20
			}}
		>
			{children}
		</h2>
	);
};

export default Title;
