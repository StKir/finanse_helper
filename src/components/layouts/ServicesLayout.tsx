import { FC, PropsWithChildren } from 'react';
import GoBackBtn from '../ui/goBackBtn/GoBackBtn';

const ServicesLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='container'>
			<GoBackBtn />
			{children}
		</div>
	);
};

export default ServicesLayout;
