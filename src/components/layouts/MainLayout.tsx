import React, { FC, PropsWithChildren } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ConfigProvider } from 'antd';

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
