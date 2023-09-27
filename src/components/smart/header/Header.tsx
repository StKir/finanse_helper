import { FC, useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Avatar, Button, Drawer, Layout, Menu, Space } from 'antd';
import { pages } from '@/components/pages';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/img/logo.png';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import Auth from '../auth/Auth';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { removeUser, setModalStatus, setUser } from '@/store/slices/UserSlice';
import { useAuth } from '@/hooks/useAuth';

const Header: FC = () => {
	const { Header } = Layout;
	return (
		<Layout>
			<Header className={styles.header_style}>
				<Navigations />
			</Header>
		</Layout>
	);
};

const Navigations = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { isAuth } = useAuth();
	const authModal = useAppSelector((state) => state.user.authModalIsOpen);
	const dispathc = useAppDispatch();
	const { currentUser } = getAuth();

	useEffect(() => {
		if (currentUser) {
			dispathc(
				setUser({
					id: currentUser.uid,
					email: currentUser.email!,
					token: currentUser.uid,
					authLoadingStatus: 'success'
				})
			);
		}
	}, [currentUser, dispathc]);

	const onClose = () => {
		setOpen(false);
	};
	const showDrawer = () => {
		setOpen(true);
	};

	const authHandle = (isAuth: boolean) => {
		if (isAuth) {
			const auth = getAuth();
			signOut(auth).then(() => {
				dispathc(removeUser());
			});
			localStorage.removeItem('user');
		} else {
			dispathc(setModalStatus(true));
		}
	};

	const items = pages.map(({ title, href, id }) => ({
		key: id,
		label: (
			<Link href={href} className={styles.link}>
				{title}
			</Link>
		)
	}));

	return (
		<div className={styles.menu}>
			<Auth isOpen={authModal} />
			<Link href={'/'} className={styles.header_logo}>
				<Image priority={true} src={Logo} alt='Logo' />
			</Link>
			<div className={styles.right_menu}>
				<Menu
					className={styles.menu_style}
					mode='vertical'
					defaultSelectedKeys={['1']}
					items={items}
				/>
				<div className={styles.right_auth}>
					<Space>
						<Avatar
							className={styles.avatar}
							size={40}
							icon={<UserOutlined />}
						/>
					</Space>
					<Button
						type='default'
						size='large'
						onClick={() => authHandle(isAuth)}
					>
						{isAuth ? 'Выйти' : 'Войти'}
					</Button>
				</div>
			</div>
			<div className={styles.mobileMenu} onClick={showDrawer}>
				<MenuOutlined className={styles.menu_icon} />
			</div>
			<Drawer
				className={styles.mobileDrawer}
				placement={'top'}
				onClose={onClose}
				open={open}
				key={'top'}
				height={'auto'}
				headerStyle={{
					borderBottom: 0,
					marginLeft: 'auto',
					padding: '24px 35px 12px 24px'
				}}
			>
				<div className={styles.menu_style_mobile}>
					<Menu
						mode='inline'
						defaultSelectedKeys={['1']}
						onClick={onClose}
						items={items}
					/>
					<Button
						type='default'
						size='middle'
						onClick={() => authHandle(isAuth)}
					>
						{isAuth ? 'Выйти' : 'Войти'}
					</Button>
				</div>
			</Drawer>
		</div>
	);
};

export default Header;
