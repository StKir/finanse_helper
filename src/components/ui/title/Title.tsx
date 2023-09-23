import { FC, PropsWithChildren } from 'react';

type TDescr = {
	desc?: string;
};

const Title: FC<PropsWithChildren & TDescr> = ({ children, desc }) => {
	return (
		<div
			style={{
				display: 'flex',
				gap: 10,
				alignItems: 'flex-end',
				marginBottom: 20,
				flexWrap: 'wrap'
			}}
		>
			<h2
				style={{
					color: '#4F4F4F',
					fontSize: 32,
					fontStyle: 'normal',
					fontWeight: 500,
					lineHeight: '110%'
				}}
			>
				{children}
			</h2>
			<span
				style={{
					color: '#828282',
					fontSize: 20,
					fontWeight: 400
				}}
			>
				{desc}
			</span>
		</div>
	);
};

export default Title;
