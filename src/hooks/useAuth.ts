import { useAppSelector } from '@/store/store';

export function useAuth() {
	const { email, id, token, username } = useAppSelector((state) => state.user);
	return {
		isAuth: !!email,
		email,
		id,
		token,
		username
	};
}
