import { FC, useState } from 'react';
import styles from './header.module.scss';
import { Avatar, Button, Drawer, DrawerProps, Layout, Menu, Space } from 'antd';
import { pages } from '@/components/pages';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/img/logo.png';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

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

	const onClose = () => {
		setOpen(false);
	};
	const showDrawer = () => {
		setOpen(true);
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
					<Button type='default' size='large'>
						Войти
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
					<Button type='default' size='middle'>
						Войти
					</Button>
				</div>
			</Drawer>
		</div>
	);
};

export default Header;
