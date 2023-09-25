import { Provider } from 'react-redux';
import React, { FC, PropsWithChildren } from 'react';
import Footer from '../simple/footer/Footer';
import { ConfigProvider } from 'antd';
import Header from '../smart/header/Header';
import store from '@/store/store';

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
				<Provider store={store}>
					<div style={{ minHeight: 'calc(100vh - 70px)' }}>
						<Header />
						{children}
					</div>
					<Footer />
				</Provider>
			</ConfigProvider>
		</>
	);
};

export default MainLayout;
