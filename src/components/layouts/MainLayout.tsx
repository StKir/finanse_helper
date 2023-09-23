import { Provider } from 'react-redux';
import React, { FC, PropsWithChildren } from 'react';
import Footer from '../smart/footer/Footer';
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
					<Header />
					{children}
					<Footer />
				</Provider>
			</ConfigProvider>
		</>
	);
};

export default MainLayout;
