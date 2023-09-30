import { FC, PropsWithChildren } from 'react';

const TitleDescription: FC<PropsWithChildren> = ({ children }) => {
	return (
		<span
			style={{
				color: '#828282',
				fontSize: 20,
				fontStyle: 'normal',
				fontWeight: 400,
				marginBottom: 10
			}}
		>
			{children}
		</span>
	);
};

export default TitleDescription;
