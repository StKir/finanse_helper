import MainLayout from '@/components/layouts/MainLayout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import '@/firebase';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Component {...pageProps} />;
		</MainLayout>
	);
}
