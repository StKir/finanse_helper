import ServicesLayout from '@/components/layouts/ServicesLayout';
import ExchangerForm from '@/components/smart/exchangerForm/ExchangerForm';
import Error from '@/components/ui/error/Error';
import Loader from '@/components/ui/loader/Loader';
import Title from '@/components/ui/title/Title';
import { useAppSelector } from '@/store/store';

const Сonvector = () => {
	const loading = useAppSelector((state) => state.valute.LoadingStatus);

	if (loading === 'error') <Error />;
	if (loading === 'loading') <Loader />;

	return (
		<ServicesLayout>
			<Title>Конвертер валют</Title>
			<ExchangerForm />
		</ServicesLayout>
	);
};

export default Сonvector;
