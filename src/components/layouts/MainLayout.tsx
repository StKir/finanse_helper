import React, { FC, PropsWithChildren } from 'react';
import Footer from '../smart/footer/Footer';
import { ConfigProvider } from 'antd';
import Header from '../smart/header/Header';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#4F69F5'
					}
				}}
			>
				<Header />
				{children}
				<Footer />
			</ConfigProvider>
		</>
	);
};

export default MainLayout;
