import Link from 'next/link';
import styles from './footer.module.scss';
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<h3>Разработал -</h3>
				<Link href={'https://github.com/StKir'}>Струков Кирилл</Link>
			</div>
		</footer>
	);
};

export default Footer;
