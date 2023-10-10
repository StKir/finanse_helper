import styles from './newService.module.scss';
import { FC } from 'react';
import Link from 'next/link';
import { INewService } from '@/interfaces/component.interface';

const NewService: FC<INewService> = ({ title, description, link }) => {
	return (
		<Link href={link} className={styles.new_service_card_wrp}>
			<h3>{title}</h3>
			<p>{description}</p>
		</Link>
	);
};

export default NewService;
