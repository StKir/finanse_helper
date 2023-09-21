import MainLayout from '@/components/layouts/MainLayout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Component {...pageProps} />;
		</MainLayout>
	);
}
