import { Provider } from 'react-redux';
import React, { FC, PropsWithChildren } from 'react';
import Footer from '../simple/footer/Footer';
import { ConfigProvider } from 'antd';
import Header from '../smart/header/Header';
import store from '@/store/store';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponents from '../ui/error/Error';

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
					<ErrorBoundary
						fallback={
							<ErrorComponents massage='Произошла неизвестная ошибка' />
						}
					>
						<div style={{ minHeight: 'calc(100vh - 70px)' }}>
							<Header />
							{children}
						</div>
						<Footer />
					</ErrorBoundary>
				</Provider>
			</ConfigProvider>
		</>
	);
};

export default MainLayout;
